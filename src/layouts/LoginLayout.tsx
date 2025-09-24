import React, { useEffect, useState } from 'react';
import styles from './LoginLayout.module.css';

const slogans = [
  'Controle total do seu estoque, sem complicação.',
  'Automatize processos e reduza erros operacionais.',
  'Visibilidade em tempo real para decisões rápidas.',
  'Aumente a eficiência do seu armazém com tecnologia.',
  'Rastreabilidade completa do início ao fim.',
  'Seu estoque seguro, organizado e sempre disponível.',
  'Transforme dados em crescimento para o seu negócio.',
  'A evolução do WMS para o seu controle logístico.',
  'Gestão inteligente inspirada nos melhores WMS.',
  'Estoque sob controle, empresa em crescimento.'
];

interface LoginLayoutProps {
  children: React.ReactNode;
}

export default function LoginLayout({ children }: LoginLayoutProps) {
  const [sloganIndex, setSloganIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setSloganIndex((prev) => (prev + 1) % slogans.length);
        setFade(true);
      }, 500);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.logoFaixaWrapper}>
          <div className={styles.logoFaixa}></div>
          <img src="/logo.png" alt="Logo Estocafy" className={styles.logo} />
        </div>
        <div className={styles.slogan} style={{ opacity: fade ? 1 : 0 }}>
          {slogans[sloganIndex]}
        </div>
      </div>
      <div className={styles.right}>{children}</div>
    </div>
  );
} 