import { ClipboardList, MessageCircle, Store } from "lucide-react";
import { site } from "../config/site";
import { useLanguage } from "../context/LanguageContext";
import { QrPoster } from "../components/QrPoster";

export default function QrMoneyPage() {
  const { t } = useLanguage();
  return (
    <QrPoster
      target={site.links.moneyForm}
      title={t.qrMoney.title}
      subtitle={t.qrMoney.subtitle}
      highlightNote={t.qrMoney.note}
      bullets={t.moneyPage.steps}
      bulletIcons={[ClipboardList, MessageCircle, Store]}
      testid="qr-poster-money"
    />
  );
}
