import { useCallback, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import styles from "./IrresistibleButton.module.css";

const isExternalHref = (to) =>
  typeof to === "string" && (/^(https?:)?\/\//.test(to) || to.startsWith("mailto:") || to.startsWith("tel:"));

// Boton con micro-interacciones (pulso en reposo, brillo al hover, ripple al
// tocar): pensado para CTAs que de verdad quieren que se pulsen. `as="span"`
// lo renderiza sin enlace propio, para usarlo dentro de una tarjeta que ya
// es un <a> (evita anidar enlaces, invalido en HTML).
export const IrresistibleButton = ({
  label,
  to,
  variant = "money",
  size = "lg",
  icon = null,
  showArrow = true,
  as,
  className = "",
  onClick,
  ...rest
}) => {
  const [ripples, setRipples] = useState([]);
  const idRef = useRef(0);

  const addRipple = useCallback((e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const point = e.touches?.[0] ?? e;
    const x = point.clientX - rect.left - size / 2;
    const y = point.clientY - rect.top - size / 2;
    const id = ++idRef.current;
    setRipples((prev) => [...prev, { id, x, y, size }]);
    window.setTimeout(() => setRipples((prev) => prev.filter((r) => r.id !== id)), 600);
  }, []);

  const variantClass = styles[variant] || styles.money;
  const sizeClass = styles[`size-${size}`] || styles["size-lg"];
  const classes = `${styles.btn} ${variantClass} ${sizeClass} ${className}`.trim();

  const inner = (
    <>
      {ripples.map((r) => (
        <span
          key={r.id}
          className={styles.ripple}
          style={{ left: r.x, top: r.y, width: r.size, height: r.size }}
          aria-hidden="true"
        />
      ))}
      <span className={styles.content}>
        {icon && <span className={styles.icon}>{icon}</span>}
        <span>{label}</span>
        {showArrow && (
          <span className={styles.arrow} aria-hidden="true">
            <ArrowRight className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
          </span>
        )}
      </span>
    </>
  );

  if (as === "span") {
    return (
      <span className={classes} onPointerDown={addRipple} {...rest}>
        {inner}
      </span>
    );
  }

  if (isExternalHref(to)) {
    return (
      <a
        href={to}
        target="_blank"
        rel="noopener noreferrer"
        onPointerDown={addRipple}
        onClick={onClick}
        className={classes}
        {...rest}
      >
        {inner}
      </a>
    );
  }

  return (
    <Link to={to} onPointerDown={addRipple} onClick={onClick} className={classes} {...rest}>
      {inner}
    </Link>
  );
};

export default IrresistibleButton;
