// Anade un ancho maximo (w_) a una URL de Cloudinary que ya lleva
// f_auto,q_auto (ver site.images.partners). Sin esto, un logo usado
// como icono de 14px seguia descargando el original a tamano completo.
export const cloudinaryWidth = (url, px) => {
  if (!url) return url;
  return url.replace("/upload/", `/upload/w_${px}/`);
};
