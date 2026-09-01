import { Camera, Mail } from "lucide-react";
import { site } from "../config/site";
import { useLanguage } from "../context/LanguageContext";
import { QrPoster } from "../components/QrPoster";

export default function QrPage() {
  const { t } = useLanguage();
  return (
    <QrPoster
      target={site.links.travelForm}
      title={t.qrPage.title}
      subtitle={t.qrPage.subtitle}
      highlightNote={t.travelPage.form.priceNote}
      bullets={t.travelPage.form.bullets}
      bulletIcons={[Camera, Mail]}
      testid="qr-poster-travel"
    />
  );
}
