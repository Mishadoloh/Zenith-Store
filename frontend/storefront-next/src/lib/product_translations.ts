export interface ProductTranslation {
  title: string;
  description: string;
}

export const productTranslations: Record<string, Record<number, ProductTranslation>> = {
  uk: {
    1: {
      title: 'Ноутбук Zenith Quantum Pro',
      description: 'Ультратонкий потужний ноутбук з OLED-дисплеєм та покращеною штучним інтелектом продуктивністю.'
    },
    2: {
      title: 'Навушники Aero Pro X1',
      description: 'Студійне шумозаглушення з часом автономної роботи до 40 годин.'
    },
    3: {
      title: 'Розумний годинник Lunar Ultra',
      description: 'Нове бачення моніторингу здоров\'я з ЕКГ, рівнем кисню в крові та SpO2.'
    },
    4: {
      title: 'Монітор CrystalView 4K Pro',
      description: '32-дюймовий IPS 4K 165Hz дисплей для професіоналів.'
    },
    5: {
      title: 'Екшн-камера NovaCam 8K',
      description: 'Знімайте кінематографічне відео 8K зі стабілізацією ШІ в будь-яких умовах.'
    },
    6: {
      title: 'Саундбар SoundBar Pro X9',
      description: 'Об\'ємний звук Dolby Atmos 3D в елегантному настінному дизайні.'
    },
    9: {
      title: 'В\'язаний пончо-кардиган',
      description: 'Елегантний в\'язаний кардиган вільного крою для прохолодних вечорів.'
    },
    41: {
      title: 'Механічна клавіатура Apex',
      description: 'Механічна клавіатура з можливістю гарячої заміни перемикачів та RGB підсвіткою.'
    },
    42: {
      title: 'Бездротова ігрова миша Apex',
      description: 'Ультралегка ігрова миша 54г з оптичним сенсором 30K.'
    },
    43: {
      title: 'Шолом віртуальної реальності VR Vision Horizon',
      description: 'Автономна гарнітура VR з подвійними екранами micro-OLED 4K.'
    },
    44: {
      title: 'Повербанк OmniCharge 20K',
      description: 'Портативний зарядний пристрій 100W USB-C PD з інформативним OLED-екраном.'
    }
  },
  es: {
    1: {
      title: 'Portátil Zenith Quantum Pro',
      description: 'Potencia ultra delgada con pantalla OLED y rendimiento mejorado por IA.'
    },
    2: {
      title: 'Auriculares Aero Pro X1',
      description: 'Cancelación de ruido de grado de estudio con 40 horas de batería.'
    },
    3: {
      title: 'Reloj Inteligente Lunar Ultra',
      description: 'Monitoreo de salud reinventado con ECG, glucosa en sangre y SpO2.'
    },
    4: {
      title: 'Monitor CrystalView 4K Pro',
      description: 'Pantalla IPS 4K de 32" a 165Hz diseñada para creadores profesionales.'
    },
    5: {
      title: 'Cámara de Acción NovaCam 8K',
      description: 'Captura metraje cinematográfico 8K con estabilización por IA en cualquier condición.'
    },
    6: {
      title: 'Barra de Sonido SoundBar Pro X9',
      description: 'Sonido envolvente Dolby Atmos 3D en un diseño elegante de pared.'
    },
    9: {
      title: 'Cárdigan Poncho de Punto',
      description: 'Cárdigan elegante de punto suelto para las tardes frescas.'
    },
    41: {
      title: 'Teclado Mecánico Apex',
      description: 'Teclado mecánico intercambiable en caliente con interruptores lineales y RGB.'
    },
    42: {
      title: 'Ratón Inalámbrico Apex para Juegos',
      description: 'Ratón ultra ligero de 54g con sensor óptico de 30K.'
    },
    43: {
      title: 'Visor VR Vision Horizon',
      description: 'Visor de realidad virtual independiente con pantallas dobles micro-OLED 4K.'
    },
    44: {
      title: 'Banco de Energía OmniCharge 20K',
      description: 'Cargador portátil USB-C de 100W con pantalla OLED inteligente.'
    }
  },
  de: {
    1: {
      title: 'Zenith Quantum Pro Laptop',
      description: 'Ultradünnes Kraftpaket mit OLED-Display und KI-gestützter Leistung.'
    },
    2: {
      title: 'Aero Pro Kopfhörer X1',
      description: 'Geräuschunterdrückung in Studioqualität mit 40 Stunden Akkulaufzeit.'
    },
    3: {
      title: 'Lunar Series Smartwatch Ultra',
      description: 'Gesundheitsüberwachung neu gedacht mit EKG, Blutzucker & SpO2.'
    },
    4: {
      title: 'CrystalView 4K Monitor Pro',
      description: '32" IPS 4K 165Hz Display, entwickelt für kreative Profis.'
    },
    5: {
      title: 'NovaCam 8K Action-Kamera',
      description: 'Nehmen Sie filmreife 8K-Aufnahmen mit KI-Stabilisierung unter allen Bedingungen auf.'
    },
    6: {
      title: 'SoundBar Pro X9',
      description: 'Dolby Atmos 3D Surround-Sound in einem eleganten, wandmontierten Design.'
    },
    9: {
      title: 'Strick-Poncho-Cardigan',
      description: 'Eleganter, lockerer Strick-Cardigan für kühle Abende.'
    },
    41: {
      title: 'Apex Mechanische Tastatur',
      description: 'Hot-Swap-fähige mechanische Tastatur mit linearen Schaltern und RGB.'
    },
    42: {
      title: 'Apex Kabellose Gaming-Maus',
      description: 'Ultraleichte 54g Gaming-Maus mit optischem 30K-Sensor.'
    },
    43: {
      title: 'VR Vision Horizon Headset',
      description: 'Eigenständiges VR-Headset mit zwei micro-OLED 4K-Displays.'
    },
    44: {
      title: 'OmniCharge 20K Powerbank',
      description: 'Tragbares 100W USB-C PD Ladegerät mit intelligentem OLED-Display.'
    }
  }
};

// Auto-fill fallback for English / other products
export function getProductTranslation(id: number, lang: string, fallbackTitle: string, fallbackDesc: string) {
  const dict = productTranslations[lang];
  if (dict && dict[id]) {
    return {
      title: dict[id].title,
      description: dict[id].description
    };
  }
  // Generic translation generator for items beyond the explicitly defined ones
  // to ensure they are at least clean and not key strings
  return {
    title: fallbackTitle,
    description: fallbackDesc
  };
}
