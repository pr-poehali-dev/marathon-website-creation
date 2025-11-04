import json
import os
import psycopg2
import random
import re
from typing import Dict, Any, List

def contains_profanity(text: str) -> bool:
    '''
    Проверяет текст на наличие нецензурных слов
    '''
    profanity_patterns: List[str] = [
        r'\b[xх][uу][йиеёyeя]',
        r'\b[pп][iі1и][zз3]\w*[eе]?[cс]',
        r'\b[бb6][лl]\w*[дd]',
        r'\b[eе][бb6]\w*[нnh]',
        r'\b[мm][уyu]\w*[дd]\w*[aа]',
        r'\b[sс][уyu]\w*[kк]',
        r'\b[гg]\w*[вvоo]\w*[нnh]',
        r'\b[жzg]\w*[pп]',
        r'\b[дd]\w*[eе]\w*[рpr]\w*[мm]',
        r'\b[sс]\w*[рpr]\w*[aа]\w*[тt]',
    ]
    
    text_lower = text.lower()
    text_normalized = text_lower.replace('ё', 'е')
    
    for pattern in profanity_patterns:
        if re.search(pattern, text_normalized, re.IGNORECASE):
            return True
    
    return False

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: API для чата участников марафона - получение и отправка сообщений с модерацией
    Args: event - dict с httpMethod, body, queryStringParameters
          context - object с атрибутами request_id, function_name
    Returns: HTTP response dict с сообщениями чата
    '''
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }
    
    database_url = os.environ.get('DATABASE_URL')
    if not database_url:
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Database configuration missing'})
        }
    
    try:
        conn = psycopg2.connect(database_url)
        cursor = conn.cursor()
        
        if method == 'GET':
            cursor.execute('''
                SELECT id, username, text, timestamp, avatar_color 
                FROM chat_messages 
                ORDER BY timestamp DESC 
                LIMIT 100
            ''')
            
            rows = cursor.fetchall()
            messages = []
            for row in rows:
                messages.append({
                    'id': row[0],
                    'username': row[1],
                    'text': row[2],
                    'timestamp': row[3].isoformat() if row[3] else None,
                    'avatar_color': row[4]
                })
            
            messages.reverse()
            
            cursor.close()
            conn.close()
            
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'messages': messages})
            }
        
        elif method == 'POST':
            body_data = json.loads(event.get('body', '{}'))
            username = body_data.get('username', '').strip()
            text = body_data.get('text', '').strip()
            
            if not username or not text:
                return {
                    'statusCode': 400,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    'body': json.dumps({'error': 'Username and text are required'})
                }
            
            if len(username) > 50 or len(text) > 500:
                return {
                    'statusCode': 400,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    'body': json.dumps({'error': 'Username or text too long'})
                }
            
            if contains_profanity(text):
                cursor.close()
                conn.close()
                return {
                    'statusCode': 403,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    'body': json.dumps({
                        'error': 'Сообщение содержит недопустимые выражения',
                        'blocked': True
                    })
                }
            
            colors = ['#0EA5E9', '#F97316', '#8B5CF6', '#10B981', '#EF4444', '#F59E0B']
            avatar_color = random.choice(colors)
            
            cursor.execute('''
                INSERT INTO chat_messages (username, text, avatar_color) 
                VALUES (%s, %s, %s) 
                RETURNING id
            ''', (username, text, avatar_color))
            
            message_id = cursor.fetchone()[0]
            conn.commit()
            
            cursor.close()
            conn.close()
            
            return {
                'statusCode': 201,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'id': message_id, 'status': 'created'})
            }
        
        else:
            return {
                'statusCode': 405,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'error': 'Method not allowed'})
            }
    
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': str(e)})
        }