import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';
import CommunityChat from '@/components/CommunityChat';

const Index = () => {
  const targetDate = new Date('2025-12-01T00:00:00').getTime();
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <div className="min-h-screen">
      <header className="fixed top-0 w-full bg-white/95 backdrop-blur-sm z-50 shadow-sm">
        <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-primary">❄️ Марафон Закаливания</h1>
          <div className="hidden md:flex gap-6">
            <a href="#program" className="hover:text-primary transition-colors">Программа</a>
            <a href="#trainers" className="hover:text-primary transition-colors">Тренеры</a>
            <a href="#reviews" className="hover:text-primary transition-colors">Отзывы</a>
            <a href="#chat" className="hover:text-primary transition-colors">Чат</a>
            <a href="#register" className="hover:text-primary transition-colors">Регистрация</a>
            <a href="#contacts" className="hover:text-primary transition-colors">Контакты</a>
          </div>
        </nav>
      </header>

      <section className="pt-32 pb-20 px-4 bg-gradient-to-br from-primary/10 via-secondary/10 to-primary/5 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img 
            src="https://cdn.poehali.dev/projects/b8f976ec-c707-4d62-8e5a-d59250595e0d/files/353f51ad-6853-411f-b724-316516e4137a.jpg" 
            alt="Cold water challenge" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="container mx-auto text-center relative z-10">
          <h2 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
            Стань Сильнее.<br />Стань Здоровее.
          </h2>
          <p className="text-xl md:text-2xl mb-12 text-muted-foreground max-w-3xl mx-auto animate-fade-in">
            30-дневный марафон по закаливанию для тех, кто готов изменить свою жизнь
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-12">
            {[
              { label: 'Дней', value: timeLeft.days },
              { label: 'Часов', value: timeLeft.hours },
              { label: 'Минут', value: timeLeft.minutes },
              { label: 'Секунд', value: timeLeft.seconds }
            ].map((item, idx) => (
              <Card key={idx} className="animate-scale-in hover:scale-105 transition-transform">
                <CardContent className="p-6">
                  <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                    {item.value}
                  </div>
                  <div className="text-sm text-muted-foreground uppercase">{item.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Button size="lg" className="text-lg px-8 py-6 animate-pulse-glow" asChild>
            <a href="#register">Записаться на марафон</a>
          </Button>
        </div>
      </section>

      <section id="program" className="py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">Программа Марафона</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: 'Waves',
                title: 'Неделя 1-2: Основы',
                description: 'Контрастный душ, правильное дыхание, подготовка организма к холоду'
              },
              {
                icon: 'Snowflake',
                title: 'Неделя 3: Погружение',
                description: 'Практики обливания, работа с психологией страха перед холодом'
              },
              {
                icon: 'Flame',
                title: 'Неделя 4: Мастерство',
                description: 'Моржевание, ледяные ванны, поддержание практики на всю жизнь'
              }
            ].map((item, idx) => (
              <Card key={idx} className="hover:shadow-xl transition-shadow animate-fade-in">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 mx-auto mb-6 bg-primary/10 rounded-full flex items-center justify-center">
                    <Icon name={item.icon} size={32} className="text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="trainers" className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">Тренеры и Эксперты</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              {
                name: 'Алексей Морозов',
                role: 'Основатель марафона',
                experience: '15 лет практики закаливания',
                desc: 'Сертифицированный тренер по методу Вим Хофа, провел более 50 марафонов'
              },
              {
                name: 'Елена Снежная',
                role: 'Врач-терапевт',
                experience: 'Специалист по холодовой адаптации',
                desc: 'Кандидат медицинских наук, автор научных работ о пользе закаливания'
              }
            ].map((trainer, idx) => (
              <Card key={idx} className="hover:shadow-xl transition-shadow animate-fade-in">
                <CardContent className="p-8">
                  <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-4xl">
                    {idx === 0 ? '🧊' : '⚕️'}
                  </div>
                  <h3 className="text-2xl font-bold text-center mb-2">{trainer.name}</h3>
                  <p className="text-primary text-center font-medium mb-2">{trainer.role}</p>
                  <p className="text-sm text-muted-foreground text-center mb-4">{trainer.experience}</p>
                  <p className="text-center leading-relaxed">{trainer.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="reviews" className="py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">Отзывы Участников</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: 'Дмитрий',
                text: 'После марафона забыл, что такое простуда! Энергии стало в 10 раз больше',
                rating: 5
              },
              {
                name: 'Мария',
                text: 'Невероятные ощущения! Научилась не бояться холода и полюбила зиму',
                rating: 5
              },
              {
                name: 'Сергей',
                text: 'Лучшее вложение в здоровье. Рекомендую всем, кто хочет стать сильнее',
                rating: 5
              }
            ].map((review, idx) => (
              <Card key={idx} className="hover:shadow-xl transition-shadow animate-fade-in">
                <CardContent className="p-6">
                  <div className="flex gap-1 mb-4">
                    {[...Array(review.rating)].map((_, i) => (
                      <Icon key={i} name="Star" size={20} className="text-secondary fill-secondary" />
                    ))}
                  </div>
                  <p className="text-lg mb-4 leading-relaxed">"{review.text}"</p>
                  <p className="font-bold text-primary">— {review.name}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="chat" className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">Чат Участников</h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Общайтесь с единомышленниками, делитесь опытом и поддерживайте друг друга на пути к здоровью
          </p>
          <CommunityChat />
        </div>
      </section>

      <section id="register" className="py-20 px-4 bg-gradient-to-br from-primary to-secondary text-white">
        <div className="container mx-auto max-w-2xl">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-8">
            Регистрация на Марафон
          </h2>
          <p className="text-xl text-center mb-12 opacity-90">
            Начни путь к здоровью и силе уже сегодня!
          </p>
          
          <Card className="bg-white text-foreground">
            <CardContent className="p-8">
              <form className="space-y-6">
                <div>
                  <label className="block mb-2 font-medium">Имя</label>
                  <Input placeholder="Ваше имя" className="w-full" />
                </div>
                <div>
                  <label className="block mb-2 font-medium">Email</label>
                  <Input type="email" placeholder="your@email.com" className="w-full" />
                </div>
                <div>
                  <label className="block mb-2 font-medium">Телефон</label>
                  <Input type="tel" placeholder="+7 (999) 123-45-67" className="w-full" />
                </div>
                <div>
                  <label className="block mb-2 font-medium">Опыт закаливания</label>
                  <Textarea placeholder="Расскажите о вашем опыте или его отсутствии" className="w-full" rows={4} />
                </div>
                <Button size="lg" className="w-full bg-primary hover:bg-primary/90 text-white">
                  Записаться сейчас
                </Button>
              </form>
              <p className="text-center text-sm text-muted-foreground mt-6">
                Стоимость участия: 4900₽ / Старт: 1 декабря 2025
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section id="contacts" className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">Контакты</h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold mb-6">Свяжитесь с нами</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <Icon name="Mail" size={24} className="text-primary" />
                  <span>info@marafon-zakalivanie.ru</span>
                </div>
                <div className="flex items-center gap-4">
                  <Icon name="Phone" size={24} className="text-primary" />
                  <span>+7 (999) 123-45-67</span>
                </div>
                <div className="flex items-center gap-4">
                  <Icon name="MapPin" size={24} className="text-primary" />
                  <span>Москва, ул. Здоровья, 1</span>
                </div>
              </div>
              <div className="flex gap-4 mt-8">
                <Button variant="outline" size="icon" className="rounded-full">
                  <Icon name="Instagram" size={20} />
                </Button>
                <Button variant="outline" size="icon" className="rounded-full">
                  <Icon name="Facebook" size={20} />
                </Button>
                <Button variant="outline" size="icon" className="rounded-full">
                  <Icon name="Youtube" size={20} />
                </Button>
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-6">Быстрое сообщение</h3>
              <form className="space-y-4">
                <Input placeholder="Ваше имя" />
                <Input type="email" placeholder="Email" />
                <Textarea placeholder="Ваше сообщение" rows={5} />
                <Button className="w-full">Отправить</Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-foreground text-background py-8 px-4">
        <div className="container mx-auto text-center">
          <p className="text-sm opacity-80">
            © 2025 Марафон Закаливания. Все права защищены.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;