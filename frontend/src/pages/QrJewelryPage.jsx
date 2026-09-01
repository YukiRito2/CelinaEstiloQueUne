import { site } from "../config/site";
import { useLanguage } from "../context/LanguageContext";
import { QrPoster } from "../components/QrPoster";

export default function QrJewelryPage() {
  const { t } = useLanguage();
  return (
    <QrPoster
      target={site.links.jewelryCatalog}
      title={t.qrJewelry.title}
      subtitle={t.qrJewelry.subtitle}
      highlightNote={t.qrJewelry.note}
      bullets={t.jewelry.categories}
      testid="qr-poster-jewelry"
    />
  );
}
