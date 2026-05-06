const fs = require('fs');
const path = require('path');

const catalogDir = './public/Catalogo';
const jsonPath = path.join(catalogDir, 'productos.json');
const productos = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

const map = {};
productos.forEach(p => { map[p.sku] = p; });

const images = fs.readdirSync(catalogDir)
  .filter(f => f.endsWith('.webp'))
  .map(f => f.replace('.webp', ''));

const orphanData = {
  'W10901-10':   { nombre: 'LANA NEGRA 210 GR', material: 'LANA NEGRA 210 GR', horma: 'HORMA DOBLE S', falda: 'FALDA 10 CM' },
  'W10A01P-10':  { nombre: 'BANGORA FINO - 6 X 5.5 X 5.5', material: 'BANGORA FINO - 6 X 5.5 X 5.5', horma: 'HORMA DOBLE S', falda: 'FALDA 10 CM' },
  'W10A03P-1':   { nombre: 'BANGORA FINO - 6 X 5.5 X 5.5', material: 'BANGORA FINO - 6 X 5.5 X 5.5', horma: 'HORMA RESISTOL', falda: 'FALDA 11 CM' },
  'W11101-10':   { nombre: 'LANA NATURAL 210 GR', material: 'LANA NATURAL 210 GR', horma: 'HORMA DOBLE S', falda: 'FALDA 10 CM' },
  'W111A01-10':  { nombre: 'LANA SILVER BELLY 210 GR', material: 'LANA SILVER BELLY 210 GR', horma: 'HORMA DOBLE S', falda: 'FALDA 10 CM' },
  'W111B01-10':  { nombre: 'LANA IVORY 210 GR', material: 'LANA IVORY 210 GR', horma: 'HORMA DOBLE S', falda: 'FALDA 10 CM' },
  'W11301-10':   { nombre: 'LANA PLATINO 210 GR', material: 'LANA PLATINO 210 GR', horma: 'HORMA DOBLE S', falda: 'FALDA 10 CM' },
  'W113A01-10':  { nombre: 'LANA STEEL 210 GR', material: 'LANA STEEL 210 GR', horma: 'HORMA DOBLE S', falda: 'FALDA 10 CM' },
  'W11AM03-11':  { nombre: 'BANGORA IVORI CAFE SIN SOMBRA', material: 'BANGORA IVORI CAFE SIN SOMBRA', horma: 'HORMA RESISTOL', falda: 'FALDA 11 CM' },
  'W12301-10.5': { nombre: 'CASHMERE SILVER BELLY 220 GR', material: 'CASHMERE SILVER BELLY 220 GR', horma: 'HORMA DOBLE S', falda: 'FALDA 10.5 CM' },
  'W13B03-11':   { nombre: 'BANGORA', material: 'BANGORA', horma: 'HORMA RESISTOL', falda: 'FALDA 11 CM' },
  'W14A03-11':   { nombre: 'BANGORA TAN FLECHAS', material: 'BANGORA TAN FLECHAS', horma: 'HORMA RESISTOL', falda: 'FALDA 11 CM' },
  'W14CS01-10':  { nombre: 'BANGORA RANDA TT CAFE NINO', material: 'BANGORA RANDA TT CAFE NINO', horma: 'HORMA DOBLE S', falda: 'FALDA 10 CM' },
  'W8C01-10':    { nombre: 'BANGORA', material: 'BANGORA', horma: 'HORMA DOBLE S', falda: 'FALDA 10 CM' },
  'WN16601-10':  { nombre: 'JAP G5 2X2 ROMBOS', material: 'JAP G5 2X2 ROMBOS', horma: 'HORMA DOBLE S', falda: 'FALDA 10 CM' },
};

productos.forEach(p => {
  if (images.includes(p.sku)) {
    p.imagen = `/Catalogo/${p.sku}.webp`;
  }
});

const variantMap = {
  'W14A01-10': [
    { sku: 'W14A01-10-B', label: 'Bangora', imagen: '/Catalogo/W14A01-10-B.webp' },
    { sku: 'W14A01-10-C', label: 'China', imagen: '/Catalogo/W14A01-10-C.webp' }
  ],
  'W12101-10.5': [
    { sku: 'W12101-10.5-N', label: 'Negro', imagen: '/Catalogo/W12101-10.5-N.webp' },
    { sku: 'W12101-10.5-S', label: 'Silver', imagen: '/Catalogo/W12101-10.5-S.webp' }
  ]
};

Object.entries(variantMap).forEach(([baseSku, variants]) => {
  if (map[baseSku]) {
    map[baseSku].variantes = variants;
    if (!map[baseSku].imagen) {
      map[baseSku].imagen = variants[0].imagen;
    }
  }
});

images.forEach(imgSku => {
  if (map[imgSku]) return;
  const isVariant = Object.values(variantMap).flat().some(v => v.sku === imgSku);
  if (isVariant) return;

  const data = orphanData[imgSku];
  if (data) {
    productos.push({
      sku: imgSku,
      ...data,
      imagen: `/Catalogo/${imgSku}.webp`
    });
    map[imgSku] = productos[productos.length - 1];
  } else {
    productos.push({
      sku: imgSku,
      nombre: imgSku,
      material: '',
      horma: '',
      falda: '',
      imagen: `/Catalogo/${imgSku}.webp`
    });
    map[imgSku] = productos[productos.length - 1];
  }
});

fs.writeFileSync(jsonPath, JSON.stringify(productos, null, 2));
console.log('productos.json actualizado. Total productos:', productos.length);
