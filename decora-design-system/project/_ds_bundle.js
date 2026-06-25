/* @ds-bundle: {"format":3,"namespace":"DecoraDesignSystem_779afc","components":[{"name":"AppNav","sourcePath":"components/app/AppNav.jsx"},{"name":"InvoiceStatus","sourcePath":"components/app/InvoiceStatus.jsx"},{"name":"MoneyField","sourcePath":"components/app/MoneyField.jsx"},{"name":"LogoMarquee","sourcePath":"components/cards/LogoMarquee.jsx"},{"name":"ServiceCard","sourcePath":"components/cards/ServiceCard.jsx"},{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Eyebrow","sourcePath":"components/core/Eyebrow.jsx"},{"name":"Stat","sourcePath":"components/core/Stat.jsx"},{"name":"Tag","sourcePath":"components/core/Tag.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"},{"name":"Select","sourcePath":"components/forms/Select.jsx"},{"name":"Textarea","sourcePath":"components/forms/Textarea.jsx"},{"name":"Footer","sourcePath":"components/navigation/Footer.jsx"},{"name":"NavBar","sourcePath":"components/navigation/NavBar.jsx"}],"sourceHashes":{"components/app/AppNav.jsx":"ad6a9ad32dcf","components/app/InvoiceStatus.jsx":"90378eefd81a","components/app/MoneyField.jsx":"9a23c01f884d","components/cards/LogoMarquee.jsx":"cbc69f3e7347","components/cards/ServiceCard.jsx":"1e607699bdcc","components/core/Badge.jsx":"c67b080b3191","components/core/Button.jsx":"dfe35f13ab2b","components/core/Eyebrow.jsx":"1e252aa790ec","components/core/Stat.jsx":"db7c6da9c0a2","components/core/Tag.jsx":"96dc6d786d78","components/forms/Input.jsx":"92eab4f1b4e0","components/forms/Select.jsx":"b2517af432e2","components/forms/Textarea.jsx":"9f2c1e0e2afa","components/navigation/Footer.jsx":"06ca8567d982","components/navigation/NavBar.jsx":"2c7370698cb9","ui_kits/snapbill/App.jsx":"a0b377886878","ui_kits/snapbill/Data.jsx":"6893c9c66d72","ui_kits/snapbill/Icons.jsx":"6734a7116bde","ui_kits/snapbill/Invoice.jsx":"c8398068e19f","ui_kits/website/Homepage.jsx":"a5ff28051552","ui_kits/website/Media.jsx":"844f60469b1d"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.DecoraDesignSystem_779afc = window.DecoraDesignSystem_779afc || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/app/AppNav.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * SnapBill top navigation bar (mobile-first product chrome).
 * Wordmark left, tab links right. Active tab gets a navy fill.
 * Icons are passed per-item so the component stays dependency-free.
 */
function AppNav({
  brand = "SnapBill",
  logo,
  active,
  items = [],
  onNavigate,
  style = {},
  ...rest
}) {
  return /*#__PURE__*/React.createElement("header", _extends({
    style: {
      position: "sticky",
      top: 0,
      zIndex: "var(--z-sticky)",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: "12px",
      height: "58px",
      padding: "0 16px",
      background: "rgba(251,250,246,0.85)",
      backdropFilter: "blur(10px)",
      WebkitBackdropFilter: "blur(10px)",
      borderBottom: "1px solid var(--border-hairline)",
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: () => onNavigate && onNavigate(items[0]?.key),
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: "9px",
      background: "none",
      border: "none",
      padding: 0,
      cursor: "pointer",
      color: "var(--navy-700)"
    }
  }, logo, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-display)",
      fontWeight: "var(--fw-medium)",
      fontSize: "18px",
      letterSpacing: "0.04em",
      color: "var(--navy-700)"
    }
  }, brand)), /*#__PURE__*/React.createElement("nav", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: "2px"
    }
  }, items.map(it => {
    const on = it.key === active;
    return /*#__PURE__*/React.createElement("button", {
      key: it.key,
      type: "button",
      onClick: () => onNavigate && onNavigate(it.key),
      style: {
        display: "inline-flex",
        alignItems: "center",
        gap: "6px",
        fontFamily: "var(--font-sans)",
        fontWeight: "var(--fw-medium)",
        fontSize: "13.5px",
        letterSpacing: "var(--ls-label)",
        padding: "8px 12px",
        borderRadius: "var(--radius-md)",
        border: "1px solid transparent",
        cursor: "pointer",
        transition: "background var(--dur-fast) var(--ease-out), color var(--dur-fast) var(--ease-out)",
        background: on ? "var(--navy-700)" : "transparent",
        color: on ? "var(--cream-50)" : "var(--text-muted)"
      },
      onMouseEnter: e => {
        if (!on) e.currentTarget.style.background = "var(--cream-200)";
      },
      onMouseLeave: e => {
        if (!on) e.currentTarget.style.background = "transparent";
      }
    }, it.icon, /*#__PURE__*/React.createElement("span", null, it.label));
  })));
}
Object.assign(__ds_scope, { AppNav });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/app/AppNav.jsx", error: String((e && e.message) || e) }); }

// components/app/InvoiceStatus.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Invoice status pill: draft / sent / paid. Self-contained (no Badge
 * dependency) so it can be dropped into any invoice list or header.
 */
function InvoiceStatus({
  status = "draft",
  size = "md",
  style = {},
  ...rest
}) {
  const map = {
    draft: {
      label: "Draft",
      bg: "var(--cream-200)",
      fg: "var(--stone-600)",
      dot: "var(--stone-500)"
    },
    sent: {
      label: "Sent",
      bg: "var(--teal-100)",
      fg: "var(--teal-700)",
      dot: "var(--teal-600)"
    },
    paid: {
      label: "Paid",
      bg: "#E2F0E9",
      fg: "#1E5C44",
      dot: "var(--success)"
    },
    overdue: {
      label: "Overdue",
      bg: "#F4E0DB",
      fg: "#7A2A1D",
      dot: "var(--danger)"
    }
  };
  const v = map[status] || map.draft;
  const pad = size === "sm" ? "3px 9px" : "4px 11px";
  const fs = size === "sm" ? "11.5px" : "12.5px";
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: "6px",
      fontFamily: "var(--font-sans)",
      fontWeight: "var(--fw-medium)",
      letterSpacing: "var(--ls-label)",
      lineHeight: 1.3,
      padding: pad,
      fontSize: fs,
      borderRadius: "var(--radius-pill)",
      background: v.bg,
      color: v.fg,
      whiteSpace: "nowrap",
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("span", {
    style: {
      width: "6px",
      height: "6px",
      borderRadius: "50%",
      background: v.dot,
      flex: "none"
    }
  }), v.label);
}
Object.assign(__ds_scope, { InvoiceStatus });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/app/InvoiceStatus.jsx", error: String((e && e.message) || e) }); }

// components/app/MoneyField.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Currency input with a leading "$" adornment box. Matches Decora
 * Input styling (hairline border, square corners, teal focus ring).
 * Used throughout SnapBill wherever an amount is entered.
 */
function MoneyField({
  label,
  value,
  onChange,
  hint,
  placeholder = "0",
  id,
  min = 0,
  step,
  style = {},
  ...rest
}) {
  const inputId = id || `money-${Math.random().toString(36).slice(2, 8)}`;
  const [focused, setFocused] = React.useState(false);
  const borderColor = focused ? "var(--teal-500)" : "var(--border-default)";
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "7px",
      ...style
    }
  }, label && /*#__PURE__*/React.createElement("label", {
    htmlFor: inputId,
    style: {
      fontFamily: "var(--font-sans)",
      fontSize: "var(--fs-caption)",
      fontWeight: "var(--fw-medium)",
      letterSpacing: "var(--ls-label)",
      color: "var(--text-body)"
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "stretch",
      borderRadius: "var(--radius-md)",
      border: `1px solid ${borderColor}`,
      boxShadow: focused ? "0 0 0 3px rgba(43,162,154,0.16)" : "none",
      background: "var(--surface-card)",
      overflow: "hidden",
      transition: "border-color var(--dur-base) var(--ease-out), box-shadow var(--dur-base) var(--ease-out)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    "aria-hidden": true,
    style: {
      display: "inline-flex",
      alignItems: "center",
      padding: "0 13px",
      background: "var(--cream-200)",
      borderRight: `1px solid ${borderColor}`,
      color: "var(--text-muted)",
      fontSize: "var(--fs-body)",
      fontWeight: "var(--fw-medium)"
    }
  }, "$"), /*#__PURE__*/React.createElement("input", _extends({
    id: inputId,
    type: "number",
    inputMode: "decimal",
    min: min,
    step: step,
    value: value,
    placeholder: placeholder,
    onChange: onChange,
    onFocus: () => setFocused(true),
    onBlur: () => setFocused(false),
    style: {
      flex: 1,
      width: "100%",
      minWidth: 0,
      fontFamily: "var(--font-sans)",
      fontWeight: "var(--fw-light)",
      fontSize: "var(--fs-body)",
      color: "var(--text-body)",
      background: "transparent",
      padding: "12px 14px",
      border: "none",
      outline: "none"
    }
  }, rest))), hint && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "var(--fs-caption)",
      color: "var(--text-muted)"
    }
  }, hint));
}
Object.assign(__ds_scope, { MoneyField });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/app/MoneyField.jsx", error: String((e && e.message) || e) }); }

// components/cards/LogoMarquee.jsx
try { (() => {
/**
 * Continuous horizontal logo/partner marquee. Renders children twice for a
 * seamless loop. Direction reversible for the two-row treatment.
 */
function LogoMarquee({
  children,
  speed = 38,
  reverse = false,
  fade = true,
  style = {}
}) {
  const items = React.Children.toArray(children);
  const keyId = React.useId().replace(/:/g, "");
  const anim = `decora-marquee-${keyId}`;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      overflow: "hidden",
      width: "100%",
      maskImage: fade ? "linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)" : "none",
      WebkitMaskImage: fade ? "linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)" : "none",
      ...style
    }
  }, /*#__PURE__*/React.createElement("style", null, `
        @keyframes ${anim} {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .${anim}-track { animation: ${anim} ${speed}s linear infinite; }
        .${anim}-track:hover { animation-play-state: paused; }
        @media (prefers-reduced-motion: reduce) {
          .${anim}-track { animation: none; }
        }
      `), /*#__PURE__*/React.createElement("div", {
    className: `${anim}-track`,
    style: {
      display: "flex",
      width: "max-content",
      alignItems: "center",
      gap: "var(--space-9, 6rem)",
      paddingRight: "var(--space-9, 6rem)",
      flexDirection: reverse ? "row-reverse" : "row"
    }
  }, items, items.map((c, i) => React.cloneElement(c, {
    key: `dup-${i}`
  }))));
}
Object.assign(__ds_scope, { LogoMarquee });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/cards/LogoMarquee.jsx", error: String((e && e.message) || e) }); }

// components/cards/ServiceCard.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Service / capability preview card. Image on top, editorial text below.
 * Falls back to a brand-tinted placeholder when no image is supplied.
 */
function ServiceCard({
  eyebrow,
  title,
  description,
  image,
  index,
  href = "#",
  cta = "Learn more",
  style = {},
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("a", _extends({
    href: href,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      display: "flex",
      flexDirection: "column",
      textDecoration: "none",
      background: "var(--surface-card)",
      border: `1px solid ${hover ? "var(--navy-200)" : "var(--border-hairline)"}`,
      borderRadius: "var(--radius-lg)",
      overflow: "hidden",
      boxShadow: hover ? "var(--shadow-md)" : "var(--shadow-xs)",
      transform: hover ? "translateY(-3px)" : "translateY(0)",
      transition: "transform var(--dur-base) var(--ease-out), box-shadow var(--dur-base) var(--ease-out), border-color var(--dur-base) var(--ease-out)",
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      aspectRatio: "4 / 3",
      background: image ? `center/cover no-repeat url(${image})` : "linear-gradient(135deg, var(--navy-700), var(--navy-900))",
      overflow: "hidden"
    }
  }, !image && /*#__PURE__*/React.createElement("div", {
    "aria-hidden": true,
    style: {
      position: "absolute",
      inset: 0,
      backgroundImage: "radial-gradient(var(--teal-500) 1.4px, transparent 1.6px)",
      backgroundSize: "16px 16px",
      opacity: 0.22,
      maskImage: "linear-gradient(135deg, #000, transparent 70%)",
      WebkitMaskImage: "linear-gradient(135deg, #000, transparent 70%)"
    }
  }), index != null && /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      top: "16px",
      left: "18px",
      fontFamily: "var(--font-display)",
      fontWeight: "var(--fw-light)",
      fontSize: "20px",
      color: "var(--cream-50)",
      opacity: 0.85
    }
  }, String(index).padStart(2, "0")), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      background: "linear-gradient(to top, rgba(15,29,52,0.35), transparent 55%)",
      opacity: image ? 1 : 0
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "24px 24px 26px",
      display: "flex",
      flexDirection: "column",
      gap: "10px"
    }
  }, eyebrow && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "var(--fs-eyebrow)",
      fontWeight: "var(--fw-medium)",
      letterSpacing: "var(--ls-eyebrow)",
      textTransform: "uppercase",
      color: "var(--text-accent)"
    }
  }, eyebrow), /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: 0,
      fontFamily: "var(--font-display)",
      fontWeight: "var(--fw-light)",
      fontSize: "var(--fs-h3)",
      letterSpacing: "var(--ls-heading)",
      color: "var(--text-strong)"
    }
  }, title), description && /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: "var(--fs-body-sm)",
      color: "var(--text-muted)",
      lineHeight: "var(--lh-normal)"
    }
  }, description), /*#__PURE__*/React.createElement("span", {
    style: {
      marginTop: "6px",
      display: "inline-flex",
      alignItems: "center",
      gap: "8px",
      fontSize: "var(--fs-caption)",
      fontWeight: "var(--fw-medium)",
      letterSpacing: "var(--ls-label)",
      color: hover ? "var(--teal-700)" : "var(--navy-700)",
      transition: "color var(--dur-base) var(--ease-out)"
    }
  }, cta, /*#__PURE__*/React.createElement("span", {
    style: {
      transform: hover ? "translateX(3px)" : "translateX(0)",
      transition: "transform var(--dur-base) var(--ease-out)"
    }
  }, "\u2192"))));
}
Object.assign(__ds_scope, { ServiceCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/cards/ServiceCard.jsx", error: String((e && e.message) || e) }); }

// components/core/Badge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Small status/label badge (denser than Tag, square-leaning).
 */
function Badge({
  children,
  variant = "neutral",
  dot = false,
  style = {},
  ...rest
}) {
  const variants = {
    neutral: {
      background: "var(--cream-200)",
      color: "var(--charcoal-800)",
      dot: "var(--stone-500)"
    },
    success: {
      background: "#E2F0E9",
      color: "#1E5C44",
      dot: "var(--success)"
    },
    warning: {
      background: "#F6ECD6",
      color: "#6E4F12",
      dot: "var(--warning)"
    },
    danger: {
      background: "#F4E0DB",
      color: "#7A2A1D",
      dot: "var(--danger)"
    },
    info: {
      background: "var(--teal-100)",
      color: "var(--teal-700)",
      dot: "var(--teal-600)"
    }
  };
  const v = variants[variant] || variants.neutral;
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: "6px",
      fontFamily: "var(--font-sans)",
      fontSize: "12px",
      fontWeight: "var(--fw-medium)",
      letterSpacing: "var(--ls-label)",
      lineHeight: 1.3,
      padding: "3px 9px",
      borderRadius: "var(--radius-sm)",
      background: v.background,
      color: v.color,
      ...style
    }
  }, rest), dot && /*#__PURE__*/React.createElement("span", {
    style: {
      width: "6px",
      height: "6px",
      borderRadius: "50%",
      background: v.dot,
      flex: "none"
    }
  }), children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Decora primary action. Square-leaning, Everett Medium, restrained.
 * Variants: primary (navy), secondary (teal outline), ghost, light (on dark).
 */
function Button({
  children,
  variant = "primary",
  size = "md",
  iconRight,
  iconLeft,
  disabled = false,
  href,
  onClick,
  type = "button",
  style = {},
  ...rest
}) {
  const sizes = {
    sm: {
      padding: "8px 16px",
      fontSize: "14px",
      gap: "7px"
    },
    md: {
      padding: "13px 24px",
      fontSize: "15px",
      gap: "9px"
    },
    lg: {
      padding: "17px 32px",
      fontSize: "16px",
      gap: "10px"
    }
  };
  const variants = {
    primary: {
      background: "var(--navy-700)",
      color: "var(--cream-50)",
      border: "1px solid var(--navy-700)"
    },
    secondary: {
      background: "transparent",
      color: "var(--navy-700)",
      border: "1px solid var(--navy-300)"
    },
    ghost: {
      background: "transparent",
      color: "var(--navy-700)",
      border: "1px solid transparent"
    },
    light: {
      background: "var(--cream-50)",
      color: "var(--navy-700)",
      border: "1px solid var(--cream-50)"
    },
    accent: {
      background: "var(--teal-600)",
      color: "var(--white)",
      border: "1px solid var(--teal-600)"
    }
  };
  const base = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "var(--font-sans)",
    fontWeight: "var(--fw-medium)",
    letterSpacing: "var(--ls-label)",
    lineHeight: 1,
    borderRadius: "var(--radius-md)",
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.4 : 1,
    textDecoration: "none",
    whiteSpace: "nowrap",
    transition: "background var(--dur-base) var(--ease-out), color var(--dur-base) var(--ease-out), border-color var(--dur-base) var(--ease-out), transform var(--dur-fast) var(--ease-out)",
    ...sizes[size],
    ...variants[variant],
    ...style
  };
  const hoverIn = e => {
    if (disabled) return;
    const el = e.currentTarget;
    if (variant === "primary") el.style.background = "var(--navy-800)";
    if (variant === "secondary") {
      el.style.borderColor = "var(--teal-600)";
      el.style.color = "var(--teal-700)";
    }
    if (variant === "ghost") el.style.color = "var(--teal-700)";
    if (variant === "light") el.style.background = "var(--white)";
    if (variant === "accent") el.style.background = "var(--teal-700)";
  };
  const hoverOut = e => {
    const el = e.currentTarget;
    Object.assign(el.style, {
      background: variants[variant].background,
      color: variants[variant].color,
      borderColor: variants[variant].border.split(" ").pop()
    });
  };
  const down = e => {
    if (!disabled) e.currentTarget.style.transform = "translateY(1px)";
  };
  const up = e => {
    e.currentTarget.style.transform = "translateY(0)";
  };
  const Tag = href ? "a" : "button";
  const tagProps = href ? {
    href
  } : {
    type,
    disabled
  };
  return /*#__PURE__*/React.createElement(Tag, _extends({}, tagProps, {
    onClick: onClick,
    style: base,
    onMouseEnter: hoverIn,
    onMouseLeave: hoverOut,
    onMouseDown: down,
    onMouseUp: up
  }, rest), iconLeft, children, iconRight);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Eyebrow.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Small tracked uppercase section label. The brand's signature eyebrow.
 */
function Eyebrow({
  children,
  color = "accent",
  as = "div",
  style = {},
  ...rest
}) {
  const colors = {
    accent: "var(--text-accent)",
    muted: "var(--text-muted)",
    light: "var(--navy-300)",
    bronze: "var(--bronze-600)"
  };
  const Tag = as;
  return /*#__PURE__*/React.createElement(Tag, _extends({
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: "10px",
      fontFamily: "var(--font-sans)",
      fontSize: "var(--fs-eyebrow)",
      fontWeight: "var(--fw-medium)",
      letterSpacing: "var(--ls-eyebrow)",
      textTransform: "uppercase",
      color: colors[color] || colors.accent,
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Eyebrow });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Eyebrow.jsx", error: String((e && e.message) || e) }); }

// components/core/Stat.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Big-number proof statistic. Used in trust/proof sections.
 */
function Stat({
  value,
  suffix,
  label,
  sub,
  align = "left",
  tone = "dark",
  style = {},
  ...rest
}) {
  const onDark = tone === "light";
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "8px",
      textAlign: align,
      alignItems: align === "center" ? "center" : "flex-start",
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "baseline",
      gap: "2px",
      fontFamily: "var(--font-display)",
      fontWeight: "var(--fw-light)",
      fontSize: "clamp(2.75rem, 4vw, 3.75rem)",
      lineHeight: 1,
      letterSpacing: "var(--ls-display)",
      color: onDark ? "var(--cream-50)" : "var(--text-strong)"
    }
  }, /*#__PURE__*/React.createElement("span", null, value), suffix && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "0.5em",
      color: "var(--teal-500)",
      fontWeight: "var(--fw-medium)"
    }
  }, suffix)), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: "var(--fs-body-sm)",
      fontWeight: "var(--fw-medium)",
      color: onDark ? "var(--cream-50)" : "var(--text-body)"
    }
  }, label), sub && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: "var(--fs-caption)",
      color: onDark ? "var(--navy-300)" : "var(--text-muted)"
    }
  }, sub));
}
Object.assign(__ds_scope, { Stat });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Stat.jsx", error: String((e && e.message) || e) }); }

// components/core/Tag.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Tag / chip. Pill or square. Used for capabilities, finishes, filters.
 */
function Tag({
  children,
  variant = "default",
  size = "md",
  style = {},
  ...rest
}) {
  const variants = {
    default: {
      background: "var(--cream-200)",
      color: "var(--charcoal-800)",
      border: "1px solid transparent"
    },
    outline: {
      background: "transparent",
      color: "var(--navy-700)",
      border: "1px solid var(--border-default)"
    },
    teal: {
      background: "var(--teal-100)",
      color: "var(--teal-700)",
      border: "1px solid transparent"
    },
    navy: {
      background: "var(--navy-700)",
      color: "var(--cream-50)",
      border: "1px solid var(--navy-700)"
    },
    bronze: {
      background: "var(--bronze-100)",
      color: "var(--bronze-700)",
      border: "1px solid transparent"
    }
  };
  const sizes = {
    sm: {
      padding: "3px 10px",
      fontSize: "12px"
    },
    md: {
      padding: "5px 13px",
      fontSize: "13px"
    }
  };
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: "6px",
      fontFamily: "var(--font-sans)",
      fontWeight: "var(--fw-medium)",
      letterSpacing: "var(--ls-label)",
      lineHeight: 1.4,
      borderRadius: "var(--radius-pill)",
      ...sizes[size],
      ...variants[variant],
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Tag });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Tag.jsx", error: String((e && e.message) || e) }); }

// components/forms/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Text input with label. Hairline border, square corners, teal focus.
 */
function Input({
  label,
  hint,
  error,
  id,
  type = "text",
  style = {},
  ...rest
}) {
  const inputId = id || `in-${Math.random().toString(36).slice(2, 8)}`;
  const [focused, setFocused] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "7px",
      ...style
    }
  }, label && /*#__PURE__*/React.createElement("label", {
    htmlFor: inputId,
    style: {
      fontFamily: "var(--font-sans)",
      fontSize: "var(--fs-caption)",
      fontWeight: "var(--fw-medium)",
      letterSpacing: "var(--ls-label)",
      color: "var(--text-body)"
    }
  }, label), /*#__PURE__*/React.createElement("input", _extends({
    id: inputId,
    type: type,
    onFocus: () => setFocused(true),
    onBlur: () => setFocused(false),
    style: {
      fontFamily: "var(--font-sans)",
      fontWeight: "var(--fw-light)",
      fontSize: "var(--fs-body)",
      color: "var(--text-body)",
      background: "var(--surface-card)",
      padding: "12px 14px",
      borderRadius: "var(--radius-md)",
      border: `1px solid ${error ? "var(--danger)" : focused ? "var(--teal-500)" : "var(--border-default)"}`,
      boxShadow: focused ? "0 0 0 3px rgba(43,162,154,0.16)" : "none",
      outline: "none",
      transition: "border-color var(--dur-base) var(--ease-out), box-shadow var(--dur-base) var(--ease-out)"
    }
  }, rest)), (hint || error) && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "var(--fs-caption)",
      color: error ? "var(--danger)" : "var(--text-muted)"
    }
  }, error || hint));
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Input.jsx", error: String((e && e.message) || e) }); }

// components/forms/Select.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Native select styled to match the brand inputs, with chevron.
 */
function Select({
  label,
  hint,
  options = [],
  id,
  value,
  onChange,
  style = {},
  ...rest
}) {
  const inputId = id || `sel-${Math.random().toString(36).slice(2, 8)}`;
  const [focused, setFocused] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "7px",
      ...style
    }
  }, label && /*#__PURE__*/React.createElement("label", {
    htmlFor: inputId,
    style: {
      fontFamily: "var(--font-sans)",
      fontSize: "var(--fs-caption)",
      fontWeight: "var(--fw-medium)",
      letterSpacing: "var(--ls-label)",
      color: "var(--text-body)"
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative"
    }
  }, /*#__PURE__*/React.createElement("select", _extends({
    id: inputId,
    value: value,
    onChange: onChange,
    onFocus: () => setFocused(true),
    onBlur: () => setFocused(false),
    style: {
      appearance: "none",
      width: "100%",
      fontFamily: "var(--font-sans)",
      fontWeight: "var(--fw-light)",
      fontSize: "var(--fs-body)",
      color: "var(--text-body)",
      background: "var(--surface-card)",
      padding: "12px 38px 12px 14px",
      borderRadius: "var(--radius-md)",
      border: `1px solid ${focused ? "var(--teal-500)" : "var(--border-default)"}`,
      boxShadow: focused ? "0 0 0 3px rgba(43,162,154,0.16)" : "none",
      outline: "none",
      cursor: "pointer",
      transition: "border-color var(--dur-base) var(--ease-out), box-shadow var(--dur-base) var(--ease-out)"
    }
  }, rest), options.map(o => {
    const val = typeof o === "string" ? o : o.value;
    const lbl = typeof o === "string" ? o : o.label;
    return /*#__PURE__*/React.createElement("option", {
      key: val,
      value: val
    }, lbl);
  })), /*#__PURE__*/React.createElement("span", {
    "aria-hidden": true,
    style: {
      position: "absolute",
      right: "14px",
      top: "50%",
      transform: "translateY(-50%)",
      pointerEvents: "none",
      color: "var(--text-muted)",
      fontSize: "12px"
    }
  }, "\u25BE")), hint && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "var(--fs-caption)",
      color: "var(--text-muted)"
    }
  }, hint));
}
Object.assign(__ds_scope, { Select });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Select.jsx", error: String((e && e.message) || e) }); }

// components/forms/Textarea.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Multi-line text input with label. Matches Input styling.
 */
function Textarea({
  label,
  hint,
  error,
  id,
  rows = 4,
  style = {},
  ...rest
}) {
  const inputId = id || `ta-${Math.random().toString(36).slice(2, 8)}`;
  const [focused, setFocused] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "7px",
      ...style
    }
  }, label && /*#__PURE__*/React.createElement("label", {
    htmlFor: inputId,
    style: {
      fontFamily: "var(--font-sans)",
      fontSize: "var(--fs-caption)",
      fontWeight: "var(--fw-medium)",
      letterSpacing: "var(--ls-label)",
      color: "var(--text-body)"
    }
  }, label), /*#__PURE__*/React.createElement("textarea", _extends({
    id: inputId,
    rows: rows,
    onFocus: () => setFocused(true),
    onBlur: () => setFocused(false),
    style: {
      fontFamily: "var(--font-sans)",
      fontWeight: "var(--fw-light)",
      fontSize: "var(--fs-body)",
      color: "var(--text-body)",
      background: "var(--surface-card)",
      padding: "12px 14px",
      borderRadius: "var(--radius-md)",
      border: `1px solid ${error ? "var(--danger)" : focused ? "var(--teal-500)" : "var(--border-default)"}`,
      boxShadow: focused ? "0 0 0 3px rgba(43,162,154,0.16)" : "none",
      outline: "none",
      resize: "vertical",
      lineHeight: "var(--lh-normal)",
      transition: "border-color var(--dur-base) var(--ease-out), box-shadow var(--dur-base) var(--ease-out)"
    }
  }, rest)), (hint || error) && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "var(--fs-caption)",
      color: error ? "var(--danger)" : "var(--text-muted)"
    }
  }, error || hint));
}
Object.assign(__ds_scope, { Textarea });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Textarea.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Footer.jsx
try { (() => {
/**
 * Site footer. Navy ground, columns of links, fine baseline. Clean & quiet.
 */
function Footer({
  logo,
  tagline,
  columns = [],
  legal,
  contact,
  style = {}
}) {
  return /*#__PURE__*/React.createElement("footer", {
    style: {
      background: "var(--navy-900)",
      color: "var(--cream-50)",
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: "var(--content-max)",
      margin: "0 auto",
      padding: "var(--space-9) var(--gutter) var(--space-7)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1.4fr repeat(3, 1fr)",
      gap: "40px",
      paddingBottom: "var(--space-8)",
      borderBottom: "1px solid var(--border-on-dark)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "18px",
      maxWidth: "300px"
    }
  }, logo, tagline && /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: "var(--fs-body-sm)",
      color: "var(--navy-300)",
      lineHeight: "var(--lh-normal)"
    }
  }, tagline), contact && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: "var(--fs-body-sm)",
      color: "var(--cream-50)",
      lineHeight: 1.7
    }
  }, contact)), columns.map((col, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "14px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: "var(--fs-eyebrow)",
      fontWeight: "var(--fw-medium)",
      letterSpacing: "var(--ls-eyebrow)",
      textTransform: "uppercase",
      color: "var(--teal-500)"
    }
  }, col.title), /*#__PURE__*/React.createElement("ul", {
    style: {
      listStyle: "none",
      margin: 0,
      padding: 0,
      display: "flex",
      flexDirection: "column",
      gap: "10px"
    }
  }, (col.links || []).map((l, j) => /*#__PURE__*/React.createElement("li", {
    key: j
  }, /*#__PURE__*/React.createElement("a", {
    href: l.href || "#",
    style: {
      fontSize: "var(--fs-body-sm)",
      color: "var(--navy-200)",
      textDecoration: "none",
      transition: "color var(--dur-fast) var(--ease-out)"
    },
    onMouseEnter: e => e.currentTarget.style.color = "var(--cream-50)",
    onMouseLeave: e => e.currentTarget.style.color = "var(--navy-200)"
  }, l.label))))))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      flexWrap: "wrap",
      gap: "12px",
      paddingTop: "var(--space-5)",
      fontSize: "var(--fs-caption)",
      color: "var(--navy-300)"
    }
  }, /*#__PURE__*/React.createElement("span", null, legal || `© ${new Date().getFullYear()} Decora Powder Coating + Sublimation`), /*#__PURE__*/React.createElement("span", {
    style: {
      letterSpacing: "var(--ls-label)"
    }
  }, "St. Catharines, Ontario \xB7 Canada"))));
}
Object.assign(__ds_scope, { Footer });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Footer.jsx", error: String((e && e.message) || e) }); }

// components/navigation/NavBar.jsx
try { (() => {
/**
 * Slim top navigation. Transparent over dark hero, frosted cream on scroll.
 * Pass `scrolled` to force the solid state (useful in static mocks).
 */
function NavBar({
  logo,
  links = [],
  cta,
  scrolled: scrolledProp,
  variant = "auto",
  style = {}
}) {
  const [scrolledState, setScrolled] = React.useState(false);
  React.useEffect(() => {
    if (scrolledProp != null || variant !== "auto") return;
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, {
      passive: true
    });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [scrolledProp, variant]);
  const solid = variant === "solid" || scrolledProp != null ? !!scrolledProp || variant === "solid" : scrolledState;
  const onDark = variant === "onDark" || variant === "auto" && !solid;
  const linkColor = onDark ? "var(--cream-50)" : "var(--charcoal-800)";
  return /*#__PURE__*/React.createElement("header", {
    style: {
      position: "sticky",
      top: 0,
      zIndex: "var(--z-sticky)",
      background: solid ? "rgba(246,243,236,0.82)" : "transparent",
      backdropFilter: solid ? "blur(12px)" : "none",
      WebkitBackdropFilter: solid ? "blur(12px)" : "none",
      borderBottom: `1px solid ${solid ? "var(--border-hairline)" : "transparent"}`,
      transition: "background var(--dur-base) var(--ease-out), border-color var(--dur-base) var(--ease-out)",
      ...style
    }
  }, /*#__PURE__*/React.createElement("nav", {
    style: {
      maxWidth: "var(--content-max)",
      margin: "0 auto",
      padding: "16px var(--gutter)",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: "24px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center"
    }
  }, logo), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: "32px"
    }
  }, /*#__PURE__*/React.createElement("ul", {
    style: {
      display: "flex",
      gap: "30px",
      listStyle: "none",
      margin: 0,
      padding: 0
    }
  }, links.map((l, i) => /*#__PURE__*/React.createElement("li", {
    key: i
  }, /*#__PURE__*/React.createElement("a", {
    href: l.href || "#",
    style: {
      fontFamily: "var(--font-sans)",
      fontSize: "var(--fs-body-sm)",
      fontWeight: "var(--fw-medium)",
      letterSpacing: "var(--ls-label)",
      color: linkColor,
      textDecoration: "none",
      opacity: 0.92,
      transition: "opacity var(--dur-fast) var(--ease-out)"
    },
    onMouseEnter: e => e.currentTarget.style.opacity = "0.6",
    onMouseLeave: e => e.currentTarget.style.opacity = "0.92"
  }, l.label)))), cta || /*#__PURE__*/React.createElement(__ds_scope.Button, {
    variant: onDark ? "light" : "primary",
    size: "sm"
  }, "Request a quote"))));
}
Object.assign(__ds_scope, { NavBar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/NavBar.jsx", error: String((e && e.message) || e) }); }

// ui_kits/snapbill/App.jsx
try { (() => {
/* SnapBill — shared UI atoms + the New Invoice / History / Settings screens.
   Loaded after Icons.jsx + Data.jsx + the DS bundle. Exports window.SnapParts. */

const DS = window.DecoraDesignSystem_779afc;
const {
  Button,
  Input,
  Select,
  Textarea,
  Eyebrow,
  AppNav,
  MoneyField,
  InvoiceStatus
} = DS;
const Icon = window.Icon;
const DotMark = window.DotMark;
const {
  fmt,
  fmtDate,
  fmtDateShort,
  addDays,
  calculateInvoice
} = window.SnapData;

/* ---------- atoms ---------- */
function Card({
  children,
  style = {}
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: "var(--surface-card)",
      border: "1px solid var(--border-hairline)",
      borderRadius: "var(--radius-lg)",
      padding: "20px",
      boxShadow: "var(--shadow-xs)",
      ...style
    }
  }, children);
}
function CardTitle({
  icon,
  children
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: "9px",
      marginBottom: "16px"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--teal-600)",
      display: "inline-flex"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: icon,
    size: 17
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-sans)",
      fontWeight: "var(--fw-medium)",
      fontSize: "14px",
      letterSpacing: "var(--ls-label)",
      color: "var(--text-strong)"
    }
  }, children));
}
function ScreenHead({
  title,
  sub
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: "4px"
    }
  }, /*#__PURE__*/React.createElement("h1", {
    style: {
      fontSize: "var(--fs-h2)",
      fontWeight: "var(--fw-light)",
      letterSpacing: "var(--ls-heading)",
      color: "var(--text-strong)"
    }
  }, title), sub && /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: "6px",
      fontSize: "var(--fs-body-sm)",
      color: "var(--text-muted)"
    }
  }, sub));
}
function NAV(active) {
  return [{
    key: "new",
    label: "New",
    icon: /*#__PURE__*/React.createElement(Icon, {
      name: "file-text",
      size: 15
    })
  }, {
    key: "history",
    label: "History",
    icon: /*#__PURE__*/React.createElement(Icon, {
      name: "history",
      size: 15
    })
  }, {
    key: "settings",
    label: "Settings",
    icon: /*#__PURE__*/React.createElement(Icon, {
      name: "settings",
      size: 15
    })
  }];
}

/* Small wordmark mark used in the nav (camera glyph in a navy square). */
function SnapMark() {
  return /*#__PURE__*/React.createElement("span", {
    style: {
      width: "26px",
      height: "26px",
      borderRadius: "var(--radius-sm)",
      background: "var(--navy-700)",
      color: "var(--cream-50)",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "camera",
    size: 15
  }));
}

/* ---------- Voice fill (refined, brand-correct — no purple/gradient slop) ---------- */
function VoiceFill({
  onFill
}) {
  const [state, setState] = React.useState("idle"); // idle | listening | working | done
  const timer = React.useRef(null);
  React.useEffect(() => () => clearTimeout(timer.current), []);
  function toggle() {
    if (state === "listening") {
      setState("working");
      timer.current = setTimeout(() => {
        onFill();
        setState("done");
      }, 1400);
    } else {
      setState("listening");
    }
  }
  const labels = {
    idle: "Describe the job out loud",
    listening: "Listening… tap to stop",
    working: "Filling your invoice…",
    done: "Form filled — review below"
  };
  const active = state === "listening";
  const working = state === "working";
  const done = state === "done";
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      overflow: "hidden",
      background: "var(--surface-inverse)",
      color: "var(--cream-50)",
      borderRadius: "var(--radius-lg)",
      padding: "20px"
    }
  }, /*#__PURE__*/React.createElement(DotMark, {
    cols: 7,
    rows: 6,
    gap: 11,
    dot: 5,
    color: "var(--teal-500)",
    style: {
      position: "absolute",
      top: 16,
      right: 16,
      opacity: 0.55
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: "8px",
      marginBottom: "16px"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "sparkles",
    size: 15,
    color: "var(--teal-300)"
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "var(--fs-eyebrow)",
      fontWeight: "var(--fw-medium)",
      letterSpacing: "var(--ls-eyebrow)",
      textTransform: "uppercase",
      color: "var(--teal-300)"
    }
  }, "Voice fill")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: "16px"
    }
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: toggle,
    disabled: working,
    style: {
      position: "relative",
      width: "56px",
      height: "56px",
      borderRadius: "50%",
      flex: "none",
      border: "none",
      cursor: working ? "default" : "pointer",
      color: "var(--white)",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      background: active ? "var(--danger)" : done ? "var(--success)" : "var(--teal-600)",
      transition: "background var(--dur-base) var(--ease-out), transform var(--dur-fast) var(--ease-out)",
      transform: active ? "scale(1.05)" : "scale(1)"
    }
  }, active && /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      inset: 0,
      borderRadius: "50%",
      background: "var(--danger)",
      opacity: 0.4,
      animation: "snapPing 1.4s var(--ease-out) infinite"
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      display: "inline-flex"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: working ? "loader" : done ? "check" : active ? "mic-off" : "mic",
    size: 24,
    style: working ? {
      animation: "snapSpin 0.9s linear infinite"
    } : {}
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: "var(--fs-body-sm)",
      fontWeight: "var(--fw-medium)",
      color: "var(--cream-50)"
    }
  }, labels[state]), state === "idle" && /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: "5px",
      fontSize: "12.5px",
      lineHeight: "var(--lh-normal)",
      color: "var(--navy-300)"
    }
  }, "e.g. \u201CJust shot Sarah & Tom\u2019s wedding \u2014 full day, 9 hours, second shooter, $500 deposit.\u201D"), done && /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: () => setState("listening"),
    style: {
      marginTop: "5px",
      background: "none",
      border: "none",
      padding: 0,
      color: "var(--teal-300)",
      fontSize: "12.5px",
      cursor: "pointer",
      textDecoration: "underline",
      textUnderlineOffset: "2px"
    }
  }, "Record again to override")))));
}

/* ---------- New Invoice ---------- */
function NewInvoice({
  profile,
  onGenerate
}) {
  const today = "2026-06-25";
  const [clientName, setClientName] = React.useState("");
  const [clientEmail, setClientEmail] = React.useState("");
  const [eventDate, setEventDate] = React.useState(today);
  const [packageId, setPackageId] = React.useState(profile.packages[1].id);
  const [packageRate, setPackageRate] = React.useState(profile.packages[1].rate);
  const [hoursWorked, setHoursWorked] = React.useState(profile.packages[1].includedHours);
  const [overtimeRate, setOvertimeRate] = React.useState(profile.defaultOvertimeRate);
  const [travelEnabled, setTravelEnabled] = React.useState(false);
  const [travelFee, setTravelFee] = React.useState(75);
  const [addOnIds, setAddOnIds] = React.useState([]);
  const [depositPaid, setDepositPaid] = React.useState(0);
  const [notes, setNotes] = React.useState("");
  const pkg = profile.packages.find(p => p.id === packageId);
  function selectPackage(id) {
    const p = profile.packages.find(x => x.id === id);
    setPackageId(id);
    setPackageRate(p.rate);
    setHoursWorked(p.includedHours);
  }
  function toggleAddOn(id) {
    setAddOnIds(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  }
  function voiceFill() {
    setClientName("Sarah & Tom");
    setClientEmail("sarah.tom@example.com");
    selectPackage("pkg_full");
    setHoursWorked(9);
    setAddOnIds(["ao_shooter"]);
    setDepositPaid(500);
    setNotes("Thank you for an amazing day!");
  }
  const addOns = profile.addOns.filter(a => addOnIds.includes(a.id));
  const calc = calculateInvoice({
    pkg,
    packageRate,
    hoursWorked,
    overtimeRate,
    travelFee: travelEnabled ? travelFee : 0,
    addOns,
    depositPaid
  });
  const canGenerate = clientName.trim().length > 0;
  function generate() {
    if (!canGenerate) return;
    const id = "inv_" + Date.now();
    onGenerate({
      id,
      clientName: clientName.trim(),
      clientEmail: clientEmail.trim(),
      eventDate,
      createdAt: today,
      dueDate: addDays(today, 7),
      packageId,
      packageName: pkg.name,
      packageRate,
      hoursWorked,
      overtimeRate,
      travelFee: travelEnabled ? travelFee : 0,
      addOnsList: addOns.map(a => ({
        name: a.name,
        price: a.price
      })),
      depositPaid,
      notes,
      status: "draft",
      calc
    });
  }
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "18px",
      paddingBottom: "96px"
    }
  }, /*#__PURE__*/React.createElement(ScreenHead, {
    title: "New invoice",
    sub: "Fill in the job \u2014 your total updates as you go."
  }), /*#__PURE__*/React.createElement(VoiceFill, {
    onFill: voiceFill
  }), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(CardTitle, {
    icon: "user"
  }, "Client & event"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gap: "14px"
    }
  }, /*#__PURE__*/React.createElement(Input, {
    label: "Client name",
    placeholder: "Sarah & Tom",
    value: clientName,
    onChange: e => setClientName(e.target.value)
  }), /*#__PURE__*/React.createElement(Input, {
    label: "Client email",
    type: "email",
    placeholder: "sarah@example.com",
    value: clientEmail,
    onChange: e => setClientEmail(e.target.value)
  }), /*#__PURE__*/React.createElement(Input, {
    label: "Event date",
    type: "date",
    value: eventDate,
    onChange: e => setEventDate(e.target.value)
  }))), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(CardTitle, {
    icon: "calendar"
  }, "Package"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gap: "14px"
    }
  }, /*#__PURE__*/React.createElement(Select, {
    label: "Select package",
    value: packageId,
    onChange: e => selectPackage(e.target.value),
    options: profile.packages.map(p => ({
      value: p.id,
      label: `${p.name} — ${fmt(p.rate)}`
    }))
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "12px"
    }
  }, /*#__PURE__*/React.createElement(MoneyField, {
    label: "Package rate",
    value: packageRate,
    onChange: e => setPackageRate(Number(e.target.value))
  }), /*#__PURE__*/React.createElement(Input, {
    label: `Hours worked (incl. ${pkg.includedHours})`,
    type: "number",
    min: 0,
    step: 0.5,
    value: hoursWorked,
    onChange: e => setHoursWorked(Number(e.target.value))
  })), calc.overtimeHours > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "12px",
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement(MoneyField, {
    label: "Overtime rate / hr",
    value: overtimeRate,
    onChange: e => setOvertimeRate(Number(e.target.value)),
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      flex: 1,
      fontSize: "12.5px",
      color: "var(--warning)",
      fontWeight: "var(--fw-medium)",
      lineHeight: "var(--lh-normal)"
    }
  }, calc.overtimeHours, " overtime hr", calc.overtimeHours !== 1 ? "s" : "", " = ", fmt(calc.overtimeHours * overtimeRate))))), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(CardTitle, {
    icon: "map-pin"
  }, "Travel fee"), /*#__PURE__*/React.createElement("label", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: "11px",
      cursor: "pointer"
    }
  }, /*#__PURE__*/React.createElement("input", {
    type: "checkbox",
    checked: travelEnabled,
    onChange: e => setTravelEnabled(e.target.checked),
    style: {
      width: "17px",
      height: "17px",
      accentColor: "var(--teal-600)"
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "var(--fs-body-sm)",
      fontWeight: "var(--fw-medium)",
      color: "var(--text-body)"
    }
  }, "Add a travel fee")), travelEnabled && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "14px",
      maxWidth: "200px"
    }
  }, /*#__PURE__*/React.createElement(MoneyField, {
    label: "Travel amount",
    value: travelFee,
    onChange: e => setTravelFee(Number(e.target.value))
  }))), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(CardTitle, {
    icon: "zap"
  }, "Add-ons"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gap: "9px"
    }
  }, profile.addOns.map(a => {
    const on = addOnIds.includes(a.id);
    return /*#__PURE__*/React.createElement("label", {
      key: a.id,
      style: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "12px 14px",
        borderRadius: "var(--radius-md)",
        cursor: "pointer",
        border: `1px solid ${on ? "var(--teal-500)" : "var(--border-default)"}`,
        background: on ? "var(--teal-100)" : "var(--surface-card)",
        transition: "background var(--dur-fast) var(--ease-out), border-color var(--dur-fast) var(--ease-out)"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: "11px"
      }
    }, /*#__PURE__*/React.createElement("input", {
      type: "checkbox",
      checked: on,
      onChange: () => toggleAddOn(a.id),
      style: {
        width: "16px",
        height: "16px",
        accentColor: "var(--teal-600)"
      }
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: "var(--fs-body-sm)",
        fontWeight: "var(--fw-medium)",
        color: "var(--text-body)"
      }
    }, a.name)), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: "var(--fs-body-sm)",
        fontWeight: "var(--fw-medium)",
        color: on ? "var(--teal-700)" : "var(--text-muted)"
      }
    }, "+", fmt(a.price)));
  }))), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(CardTitle, {
    icon: "dollar-sign"
  }, "Deposit & notes"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gap: "14px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: "200px"
    }
  }, /*#__PURE__*/React.createElement(MoneyField, {
    label: "Deposit already paid",
    value: depositPaid,
    onChange: e => setDepositPaid(Number(e.target.value))
  })), /*#__PURE__*/React.createElement(Textarea, {
    label: "Note to client",
    rows: 2,
    placeholder: "Thank you for an amazing day!",
    value: notes,
    onChange: e => setNotes(e.target.value)
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      background: "var(--surface-inverse)",
      color: "var(--cream-50)",
      borderRadius: "var(--radius-lg)",
      padding: "20px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gap: "9px",
      marginBottom: "14px"
    }
  }, calc.lineItems.map((it, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: "flex",
      justifyContent: "space-between",
      fontSize: "var(--fs-body-sm)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--navy-200)"
    }
  }, it.label), /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: "var(--fw-medium)"
    }
  }, fmt(it.amount)))), calc.deposit > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      fontSize: "var(--fs-body-sm)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--navy-200)"
    }
  }, "Deposit paid"), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--teal-300)",
      fontWeight: "var(--fw-medium)"
    }
  }, "\u2212", fmt(calc.deposit)))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      paddingTop: "14px",
      borderTop: "1px solid var(--border-on-dark)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--navy-200)",
      fontWeight: "var(--fw-medium)"
    }
  }, "Total due"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-display)",
      fontSize: "var(--fs-h2)",
      fontWeight: "var(--fw-light)",
      letterSpacing: "var(--ls-display)"
    }
  }, fmt(calc.totalDue)))), /*#__PURE__*/React.createElement(StickyBar, null, /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "lg",
    disabled: !canGenerate,
    onClick: generate,
    style: {
      width: "100%"
    },
    iconLeft: /*#__PURE__*/React.createElement(Icon, {
      name: "check-circle",
      size: 18
    }),
    iconRight: /*#__PURE__*/React.createElement(Icon, {
      name: "arrow-right",
      size: 16
    })
  }, "Generate invoice \u2014 ", fmt(calc.totalDue)), !canGenerate && /*#__PURE__*/React.createElement("p", {
    style: {
      textAlign: "center",
      fontSize: "12px",
      color: "var(--text-subtle)",
      marginTop: "8px"
    }
  }, "Enter a client name to generate")));
}

/* Sticky action bar pinned to the bottom of the phone column. */
function StickyBar({
  children
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "sticky",
      bottom: 0,
      left: 0,
      right: 0,
      margin: "0 -18px -18px",
      padding: "14px 18px",
      background: "rgba(251,250,246,0.92)",
      backdropFilter: "blur(10px)",
      WebkitBackdropFilter: "blur(10px)",
      borderTop: "1px solid var(--border-hairline)"
    }
  }, children);
}

/* ---------- History ---------- */
function SummaryTile({
  tone,
  label,
  value,
  sub
}) {
  const t = tone === "paid" ? {
    bg: "#E9F1EC",
    bd: "#CFE3D7",
    fg: "#1E5C44",
    labelFg: "#2C7A5B"
  } : {
    bg: "var(--cream-200)",
    bd: "var(--border-default)",
    fg: "var(--navy-800)",
    labelFg: "var(--bronze-700)"
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: t.bg,
      border: `1px solid ${t.bd}`,
      borderRadius: "var(--radius-lg)",
      padding: "16px 18px"
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: "var(--fs-eyebrow)",
      fontWeight: "var(--fw-medium)",
      letterSpacing: "var(--ls-eyebrow)",
      textTransform: "uppercase",
      color: t.labelFg
    }
  }, label), /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: "8px",
      fontFamily: "var(--font-display)",
      fontSize: "1.9rem",
      fontWeight: "var(--fw-light)",
      letterSpacing: "var(--ls-display)",
      color: t.fg
    }
  }, value), /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: "2px",
      fontSize: "12px",
      color: "var(--text-muted)"
    }
  }, sub));
}
function History({
  invoices,
  onOpen
}) {
  const paid = invoices.filter(i => i.status === "paid");
  const pending = invoices.filter(i => i.status !== "paid");
  const collected = paid.reduce((s, i) => s + i.calc.totalDue, 0);
  const outstanding = pending.reduce((s, i) => s + i.calc.totalDue, 0);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "18px",
      paddingBottom: "24px"
    }
  }, /*#__PURE__*/React.createElement(ScreenHead, {
    title: "Invoice history",
    sub: `${invoices.length} invoice${invoices.length !== 1 ? "s" : ""} total`
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "12px"
    }
  }, /*#__PURE__*/React.createElement(SummaryTile, {
    tone: "paid",
    label: "Collected",
    value: fmt(collected),
    sub: `${paid.length} paid`
  }), /*#__PURE__*/React.createElement(SummaryTile, {
    tone: "out",
    label: "Outstanding",
    value: fmt(outstanding),
    sub: `${pending.length} pending`
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      background: "var(--surface-card)",
      border: "1px solid var(--border-hairline)",
      borderRadius: "var(--radius-lg)",
      overflow: "hidden",
      boxShadow: "var(--shadow-xs)"
    }
  }, invoices.map((inv, i) => /*#__PURE__*/React.createElement("button", {
    key: inv.id,
    type: "button",
    onClick: () => onOpen(inv.id),
    style: {
      width: "100%",
      textAlign: "left",
      display: "flex",
      alignItems: "center",
      gap: "14px",
      padding: "15px 16px",
      background: "none",
      border: "none",
      borderTop: i === 0 ? "none" : "1px solid var(--border-hairline)",
      cursor: "pointer"
    },
    onMouseEnter: e => e.currentTarget.style.background = "var(--cream-100)",
    onMouseLeave: e => e.currentTarget.style.background = "none"
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: "38px",
      height: "38px",
      flex: "none",
      borderRadius: "var(--radius-md)",
      background: "var(--teal-100)",
      color: "var(--teal-700)",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "file-text",
    size: 18
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: "8px"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: "var(--fw-medium)",
      color: "var(--text-strong)",
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis"
    }
  }, inv.clientName), /*#__PURE__*/React.createElement(InvoiceStatus, {
    status: inv.status,
    size: "sm"
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      display: "block",
      marginTop: "3px",
      fontSize: "12px",
      color: "var(--text-muted)"
    }
  }, fmtDateShort(inv.eventDate), " \xB7 ", inv.packageName)), /*#__PURE__*/React.createElement("span", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: "6px",
      flex: "none"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: "var(--fw-medium)",
      color: "var(--text-strong)"
    }
  }, fmt(inv.calc.totalDue)), /*#__PURE__*/React.createElement(Icon, {
    name: "chevron-right",
    size: 16,
    color: "var(--text-subtle)"
  }))))));
}

/* ---------- Settings ---------- */
function Settings({
  profile
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "20px",
      paddingBottom: "24px"
    }
  }, /*#__PURE__*/React.createElement(ScreenHead, {
    title: "Settings",
    sub: "Set up your profile and rates once \u2014 pick from the menu on every invoice."
  }), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(CardTitle, {
    icon: "user"
  }, "Your profile"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gap: "14px"
    }
  }, /*#__PURE__*/React.createElement(Input, {
    label: "Business / studio name",
    defaultValue: profile.name
  }), /*#__PURE__*/React.createElement(Input, {
    label: "Tagline",
    defaultValue: profile.tagline
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "12px"
    }
  }, /*#__PURE__*/React.createElement(Input, {
    label: "Email",
    defaultValue: profile.email
  }), /*#__PURE__*/React.createElement(Input, {
    label: "Phone",
    defaultValue: profile.phone
  })), /*#__PURE__*/React.createElement(MoneyField, {
    label: "Default overtime rate / hr",
    value: profile.defaultOvertimeRate,
    onChange: () => {}
  }))), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(CardTitle, {
    icon: "calendar"
  }, "Packages"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gap: "10px"
    }
  }, profile.packages.map(p => /*#__PURE__*/React.createElement("div", {
    key: p.id,
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "13px 14px",
      background: "var(--cream-100)",
      border: "1px solid var(--border-hairline)",
      borderRadius: "var(--radius-md)"
    }
  }, /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "block",
      fontWeight: "var(--fw-medium)",
      color: "var(--text-strong)",
      fontSize: "var(--fs-body-sm)"
    }
  }, p.name), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "12px",
      color: "var(--text-muted)"
    }
  }, p.includedHours, " hrs included")), /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: "var(--fw-medium)",
      color: "var(--navy-700)"
    }
  }, fmt(p.rate)))), /*#__PURE__*/React.createElement("button", {
    type: "button",
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: "7px",
      background: "none",
      border: "none",
      padding: "4px 0",
      color: "var(--teal-700)",
      fontWeight: "var(--fw-medium)",
      fontSize: "var(--fs-body-sm)",
      cursor: "pointer"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "plus",
    size: 16
  }), " Add package"))), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(CardTitle, {
    icon: "zap"
  }, "Add-ons"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gap: "8px"
    }
  }, profile.addOns.map(a => /*#__PURE__*/React.createElement("div", {
    key: a.id,
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "11px 14px",
      background: "var(--cream-100)",
      border: "1px solid var(--border-hairline)",
      borderRadius: "var(--radius-md)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "var(--fs-body-sm)",
      color: "var(--text-body)"
    }
  }, a.name), /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: "var(--fw-medium)",
      color: "var(--navy-700)",
      fontSize: "var(--fs-body-sm)"
    }
  }, fmt(a.price)))))));
}
window.SnapParts = {
  Card,
  CardTitle,
  ScreenHead,
  NAV,
  SnapMark,
  NewInvoice,
  History,
  Settings,
  StickyBar
};
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/snapbill/App.jsx", error: String((e && e.message) || e) }); }

// ui_kits/snapbill/Data.jsx
try { (() => {
/* SnapBill — seed data, invoice math, formatters, and the dot-dispersion
   brand mark. Exports window.SnapData and window.DotMark. */

const fmt = n => `$${Number(n || 0).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
const fmtDate = iso => new Date(iso + "T12:00:00").toLocaleDateString("en-US", {
  year: "numeric",
  month: "long",
  day: "numeric"
});
const fmtDateShort = iso => new Date(iso + "T12:00:00").toLocaleDateString("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric"
});
function addDays(iso, days) {
  const d = new Date(iso + "T12:00:00");
  d.setDate(d.getDate() + days);
  return d.toISOString().split("T")[0];
}
const DEFAULT_PROFILE = {
  name: "Matt Rivera Photography",
  tagline: "Capturing your most important moments",
  email: "matt@mattrivera.photo",
  phone: "(555) 204-8810",
  packages: [{
    id: "pkg_half",
    name: "Half Day — 4 hrs",
    includedHours: 4,
    rate: 1200
  }, {
    id: "pkg_full",
    name: "Full Day — 8 hrs",
    includedHours: 8,
    rate: 2200
  }, {
    id: "pkg_premium",
    name: "Premium — 10 hrs",
    includedHours: 10,
    rate: 2800
  }],
  defaultOvertimeRate: 150,
  addOns: [{
    id: "ao_album",
    name: "Premium photo album",
    price: 350
  }, {
    id: "ao_shooter",
    name: "Second shooter",
    price: 400
  }, {
    id: "ao_drone",
    name: "Drone footage",
    price: 300
  }, {
    id: "ao_rush",
    name: "Rush editing (48 hr delivery)",
    price: 200
  }, {
    id: "ao_prints",
    name: "Print package (20 prints)",
    price: 150
  }]
};
function calculateInvoice({
  pkg,
  packageRate,
  hoursWorked,
  overtimeRate,
  travelFee,
  addOns,
  depositPaid
}) {
  const lineItems = [];
  lineItems.push({
    label: `${pkg.name}`,
    amount: Number(packageRate)
  });
  const overtimeHours = Math.max(0, hoursWorked - pkg.includedHours);
  if (overtimeHours > 0) {
    lineItems.push({
      label: `Overtime — ${overtimeHours} hr${overtimeHours !== 1 ? "s" : ""} @ ${fmt(overtimeRate)}`,
      amount: overtimeHours * overtimeRate
    });
  }
  if (travelFee > 0) lineItems.push({
    label: "Travel fee",
    amount: Number(travelFee)
  });
  (addOns || []).forEach(a => lineItems.push({
    label: a.name,
    amount: a.price
  }));
  const subtotal = lineItems.reduce((s, i) => s + i.amount, 0);
  const deposit = Number(depositPaid) || 0;
  const totalDue = Math.max(0, subtotal - deposit);
  return {
    lineItems,
    subtotal,
    deposit,
    totalDue,
    overtimeHours
  };
}

// Seed history — two pre-existing invoices so History/list views have content.
function seedInvoices() {
  const mk = over => calculateInvoice({
    pkg: DEFAULT_PROFILE.packages.find(p => p.id === over.packageId),
    packageRate: over.packageRate,
    hoursWorked: over.hoursWorked,
    overtimeRate: 150,
    travelFee: over.travelFee || 0,
    addOns: over.addOns || [],
    depositPaid: over.depositPaid || 0
  });
  return [{
    id: "inv_seed_1",
    clientName: "Priya & Daniel",
    clientEmail: "priya.daniel@example.com",
    eventDate: "2026-05-30",
    createdAt: "2026-06-01",
    dueDate: "2026-06-08",
    packageId: "pkg_premium",
    packageName: "Premium — 10 hrs",
    packageRate: 2800,
    hoursWorked: 11,
    overtimeRate: 150,
    travelFee: 75,
    addOnsList: [{
      name: "Second shooter",
      price: 400
    }, {
      name: "Drone footage",
      price: 300
    }],
    depositPaid: 800,
    notes: "Thank you for an unforgettable day at the vineyard.",
    status: "paid",
    calc: mk({
      packageId: "pkg_premium",
      packageRate: 2800,
      hoursWorked: 11,
      travelFee: 75,
      addOns: [{
        name: "Second shooter",
        price: 400
      }, {
        name: "Drone footage",
        price: 300
      }],
      depositPaid: 800
    })
  }, {
    id: "inv_seed_2",
    clientName: "The Hartleys",
    clientEmail: "events@hartley.co",
    eventDate: "2026-06-14",
    createdAt: "2026-06-16",
    dueDate: "2026-06-23",
    packageId: "pkg_full",
    packageName: "Full Day — 8 hrs",
    packageRate: 2200,
    hoursWorked: 8,
    overtimeRate: 150,
    travelFee: 0,
    addOnsList: [{
      name: "Premium photo album",
      price: 350
    }],
    depositPaid: 500,
    notes: "",
    status: "sent",
    calc: mk({
      packageId: "pkg_full",
      packageRate: 2200,
      hoursWorked: 8,
      addOns: [{
        name: "Premium photo album",
        price: 350
      }],
      depositPaid: 500
    })
  }];
}
window.SnapData = {
  fmt,
  fmtDate,
  fmtDateShort,
  addDays,
  DEFAULT_PROFILE,
  calculateInvoice,
  seedInvoices
};

/* Dot-dispersion brand mark — the signature Decora powder motif.
   Rows of dots that fade out toward the right, on transparent bg. */
function DotMark({
  cols = 8,
  rows = 7,
  gap = 13,
  dot = 5,
  color = "var(--teal-500)",
  style = {}
}) {
  const cells = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const fade = 1 - c / (cols - 0.4) * 0.92;
      cells.push(React.createElement("span", {
        key: `${r}-${c}`,
        style: {
          width: dot,
          height: dot,
          borderRadius: "50%",
          background: color,
          opacity: Math.max(0.06, fade)
        }
      }));
    }
  }
  return React.createElement("div", {
    "aria-hidden": true,
    style: {
      display: "grid",
      gridTemplateColumns: `repeat(${cols}, ${dot}px)`,
      gap: `${gap}px`,
      width: "max-content",
      ...style
    }
  }, cells);
}
window.DotMark = DotMark;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/snapbill/Data.jsx", error: String((e && e.message) || e) }); }

// ui_kits/snapbill/Icons.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* SnapBill — inline Lucide-style icons (1.5px stroke, 24px grid, currentColor).
   The brand standardizes on Lucide; these are inline so the app re-renders
   cleanly without the createIcons() DOM swap. Exports window.Icon. */

const ICON_PATHS = {
  "camera": '<path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/>',
  "file-text": '<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M16 13H8"/><path d="M16 17H8"/><path d="M10 9H8"/>',
  "history": '<path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M12 7v5l4 2"/>',
  "settings": '<line x1="21" x2="14" y1="4" y2="4"/><line x1="10" x2="3" y1="4" y2="4"/><line x1="21" x2="12" y1="12" y2="12"/><line x1="8" x2="3" y1="12" y2="12"/><line x1="21" x2="16" y1="20" y2="20"/><line x1="12" x2="3" y1="20" y2="20"/><line x1="14" x2="14" y1="2" y2="6"/><line x1="8" x2="8" y1="10" y2="14"/><line x1="16" x2="16" y1="18" y2="22"/>',
  "mic": '<path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" x2="12" y1="19" y2="22"/>',
  "mic-off": '<line x1="2" x2="22" y1="2" y2="22"/><path d="M18.89 13.23A7.12 7.12 0 0 0 19 12v-2"/><path d="M5 10v2a7 7 0 0 0 12 5"/><path d="M15 9.34V5a3 3 0 0 0-5.68-1.33"/><path d="M9 9v3a3 3 0 0 0 5.12 2.12"/><line x1="12" x2="12" y1="19" y2="22"/>',
  "check": '<path d="M20 6 9 17l-5-5"/>',
  "check-circle": '<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="m9 11 3 3L22 4"/>',
  "arrow-right": '<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>',
  "arrow-left": '<path d="M19 12H5"/><path d="m12 19-7-7 7-7"/>',
  "arrow-up-right": '<path d="M7 7h10v10"/><path d="M7 17 17 7"/>',
  "copy": '<rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>',
  "share": '<circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" x2="15.42" y1="13.51" y2="17.49"/><line x1="15.41" x2="8.59" y1="6.51" y2="10.49"/>',
  "printer": '<path d="M6 9V2h12v7"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect width="12" height="8" x="6" y="14"/>',
  "mail": '<rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>',
  "lock": '<rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
  "credit-card": '<rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/>',
  "plus": '<path d="M5 12h14"/><path d="M12 5v14"/>',
  "trash": '<path d="M3 6h18"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/>',
  "chevron-down": '<path d="m6 9 6 6 6-6"/>',
  "chevron-right": '<path d="m9 18 6-6-6-6"/>',
  "map-pin": '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>',
  "clock": '<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>',
  "calendar": '<path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/>',
  "user": '<path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',
  "external-link": '<path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>',
  "sparkles": '<path d="M9.94 14.06A2 2 0 0 0 8.5 12.6l-5.4-1.4a.5.5 0 0 1 0-.96L8.5 8.86A2 2 0 0 0 9.94 7.4l1.4-5.4a.5.5 0 0 1 .96 0l1.4 5.4A2 2 0 0 0 15.1 8.86l5.4 1.4a.5.5 0 0 1 0 .96l-5.4 1.4a2 2 0 0 0-1.44 1.44l-1.4 5.4a.5.5 0 0 1-.96 0z"/><path d="M19 3v4"/><path d="M21 5h-4"/>',
  "zap": '<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>',
  "dollar-sign": '<line x1="12" x2="12" y1="2" y2="22"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>',
  "x": '<path d="M18 6 6 18"/><path d="M6 6l12 12"/>',
  "refresh": '<path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M3 21v-5h5"/>',
  "send": '<path d="M14.54 21.69a.5.5 0 0 0 .94-.02l6.5-19a.5.5 0 0 0-.64-.64l-19 6.5a.5.5 0 0 0-.02.94l7.93 3.18a2 2 0 0 1 1.11 1.11z"/><path d="m21.85 2.15-10.94 10.94"/>',
  "rotate-ccw": '<path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/>',
  "image": '<rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.09-3.09a2 2 0 0 0-2.82 0L6 21"/>',
  "phone": '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/>',
  "globe": '<circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/>',
  "loader": '<line x1="12" x2="12" y1="2" y2="6"/><line x1="12" x2="12" y1="18" y2="22"/><line x1="4.93" x2="7.76" y1="4.93" y2="7.76"/><line x1="16.24" x2="19.07" y1="16.24" y2="19.07"/><line x1="2" x2="6" y1="12" y2="12"/><line x1="18" x2="22" y1="12" y2="12"/><line x1="4.93" x2="7.76" y1="19.07" y2="16.24"/><line x1="16.24" x2="19.07" y1="7.76" y2="4.93"/>'
};
function Icon({
  name,
  size = 20,
  strokeWidth = 1.5,
  color = "currentColor",
  style = {},
  ...rest
}) {
  const inner = ICON_PATHS[name] || "";
  return /*#__PURE__*/React.createElement("svg", _extends({
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    strokeWidth: strokeWidth,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    style: {
      flex: "none",
      display: "block",
      ...style
    },
    dangerouslySetInnerHTML: {
      __html: inner
    }
  }, rest));
}
window.Icon = Icon;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/snapbill/Icons.jsx", error: String((e && e.message) || e) }); }

// ui_kits/snapbill/Invoice.jsx
try { (() => {
/* SnapBill — branded Invoice view, Checkout flow, and the root app shell.
   Loaded last. Exports window.SnapApp (the mounted root component). */

const _DS = window.DecoraDesignSystem_779afc;
const {
  Button: B2,
  Input: In2,
  AppNav: Nav2,
  InvoiceStatus: Status2
} = _DS;
const I = window.Icon;
const Dots = window.DotMark;
const SD = window.SnapData;
const SP = window.SnapParts;

/* ---------- Branded invoice ---------- */
function InvoiceView({
  invoice,
  profile,
  onBack,
  onPay,
  onSend
}) {
  const inv = invoice;
  const isPaid = inv.status === "paid";
  const number = inv.id.replace("inv_", "INV-").toUpperCase().slice(0, 13);
  const [copied, setCopied] = React.useState(false);
  function copy() {
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  }
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "16px",
      paddingBottom: "96px"
    }
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onBack,
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: "6px",
      alignSelf: "flex-start",
      background: "none",
      border: "none",
      padding: 0,
      color: "var(--text-muted)",
      fontSize: "var(--fs-body-sm)",
      cursor: "pointer"
    }
  }, /*#__PURE__*/React.createElement(I, {
    name: "arrow-left",
    size: 16
  }), " New invoice"), inv.status !== "draft" && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: "10px",
      padding: "12px 14px",
      borderRadius: "var(--radius-md)",
      background: isPaid ? "#E9F1EC" : "var(--teal-100)",
      color: isPaid ? "#1E5C44" : "var(--teal-700)",
      fontSize: "var(--fs-body-sm)",
      fontWeight: "var(--fw-medium)"
    }
  }, /*#__PURE__*/React.createElement(I, {
    name: isPaid ? "check-circle" : "send",
    size: 16
  }), isPaid ? "Paid — payment received" : "Invoice sent — awaiting payment"), /*#__PURE__*/React.createElement("div", {
    style: {
      background: "var(--surface-card)",
      border: "1px solid var(--border-hairline)",
      borderRadius: "var(--radius-lg)",
      overflow: "hidden",
      boxShadow: "var(--shadow-sm)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      overflow: "hidden",
      background: "var(--surface-inverse)",
      color: "var(--cream-50)",
      padding: "24px 22px"
    }
  }, /*#__PURE__*/React.createElement(Dots, {
    cols: 7,
    rows: 6,
    gap: 10,
    dot: 4.5,
    color: "var(--teal-500)",
    style: {
      position: "absolute",
      top: 18,
      right: 18,
      opacity: 0.5
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-start",
      gap: "16px"
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: "9px"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: "30px",
      height: "30px",
      borderRadius: "var(--radius-sm)",
      background: "rgba(255,255,255,0.12)",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center"
    }
  }, /*#__PURE__*/React.createElement(I, {
    name: "camera",
    size: 17
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-display)",
      fontSize: "1.15rem",
      fontWeight: "var(--fw-medium)",
      letterSpacing: "0.01em"
    }
  }, profile.name)), /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: "8px",
      fontSize: "12.5px",
      color: "var(--navy-200)"
    }
  }, profile.tagline), /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: "10px",
      fontSize: "12px",
      color: "var(--navy-300)",
      lineHeight: "1.6"
    }
  }, profile.email, /*#__PURE__*/React.createElement("br", null), profile.phone)), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "right",
      flex: "none"
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: "10.5px",
      letterSpacing: "var(--ls-eyebrow)",
      textTransform: "uppercase",
      color: "var(--navy-300)"
    }
  }, "Invoice"), /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: "4px",
      fontSize: "13px",
      fontWeight: "var(--fw-medium)",
      color: "var(--cream-50)"
    }
  }, number), isPaid && /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-block",
      marginTop: "10px",
      background: "rgba(255,255,255,0.16)",
      color: "var(--cream-50)",
      fontSize: "11px",
      fontWeight: "var(--fw-medium)",
      letterSpacing: "var(--ls-label)",
      padding: "3px 9px",
      borderRadius: "var(--radius-pill)"
    }
  }, "PAID")))), /*#__PURE__*/React.createElement("div", {
    style: {
      height: "2px",
      background: "var(--bronze-500)"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "18px 22px",
      borderBottom: "1px solid var(--border-hairline)",
      display: "flex",
      justifyContent: "space-between",
      gap: "16px"
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: "10.5px",
      letterSpacing: "var(--ls-eyebrow)",
      textTransform: "uppercase",
      color: "var(--text-subtle)"
    }
  }, "Billed to"), /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: "5px",
      fontSize: "var(--fs-h4)",
      fontWeight: "var(--fw-medium)",
      color: "var(--text-strong)"
    }
  }, inv.clientName), inv.clientEmail && /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: "12.5px",
      color: "var(--text-muted)"
    }
  }, inv.clientEmail), /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: "4px",
      fontSize: "12.5px",
      color: "var(--text-muted)"
    }
  }, "Event \xB7 ", SD.fmtDate(inv.eventDate))), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "right",
      flex: "none"
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: "10.5px",
      letterSpacing: "var(--ls-eyebrow)",
      textTransform: "uppercase",
      color: "var(--text-subtle)"
    }
  }, "Due"), /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: "5px",
      fontSize: "var(--fs-body-sm)",
      fontWeight: "var(--fw-medium)",
      color: "var(--text-body)"
    }
  }, SD.fmtDateShort(inv.dueDate)))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "18px 22px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gap: "11px"
    }
  }, inv.calc.lineItems.map((it, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: "flex",
      justifyContent: "space-between",
      gap: "14px",
      fontSize: "var(--fs-body-sm)",
      paddingBottom: "11px",
      borderBottom: "1px solid var(--cream-200)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--text-body)"
    }
  }, it.label), /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: "var(--fw-medium)",
      color: "var(--text-strong)",
      whiteSpace: "nowrap"
    }
  }, SD.fmt(it.amount))))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "14px",
      display: "grid",
      gap: "8px"
    }
  }, /*#__PURE__*/React.createElement(Row, {
    label: "Subtotal",
    value: SD.fmt(inv.calc.subtotal),
    muted: true
  }), inv.calc.deposit > 0 && /*#__PURE__*/React.createElement(Row, {
    label: "Deposit received",
    value: `−${SD.fmt(inv.calc.deposit)}`,
    green: true
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "12px",
      paddingTop: "13px",
      borderTop: "1.5px solid var(--navy-800)",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: "var(--fw-medium)",
      color: "var(--text-strong)"
    }
  }, "Total due"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-display)",
      fontSize: "var(--fs-h3)",
      fontWeight: "var(--fw-light)",
      letterSpacing: "var(--ls-display)",
      color: isPaid ? "var(--success)" : "var(--navy-800)"
    }
  }, SD.fmt(inv.calc.totalDue)))), inv.notes && /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "0 22px 18px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: "var(--cream-100)",
      borderRadius: "var(--radius-md)",
      padding: "13px 15px"
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: "10.5px",
      letterSpacing: "var(--ls-eyebrow)",
      textTransform: "uppercase",
      color: "var(--text-subtle)",
      marginBottom: "5px"
    }
  }, "Note"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: "12.5px",
      color: "var(--text-muted)",
      lineHeight: "var(--lh-normal)"
    }
  }, inv.notes))), !isPaid && /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "0 22px 22px"
    }
  }, /*#__PURE__*/React.createElement(B2, {
    variant: "accent",
    size: "lg",
    onClick: onPay,
    style: {
      width: "100%"
    },
    iconLeft: /*#__PURE__*/React.createElement(I, {
      name: "external-link",
      size: 17
    })
  }, "Pay now \u2014 ", SD.fmt(inv.calc.totalDue)))), /*#__PURE__*/React.createElement(SP.StickyBar, null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "10px"
    }
  }, /*#__PURE__*/React.createElement(B2, {
    variant: "secondary",
    onClick: copy,
    style: {
      flex: 1
    },
    iconLeft: /*#__PURE__*/React.createElement(I, {
      name: copied ? "check" : "copy",
      size: 16
    })
  }, copied ? "Copied" : "Copy link"), /*#__PURE__*/React.createElement(B2, {
    variant: "primary",
    disabled: isPaid || inv.status === "sent",
    onClick: onSend,
    style: {
      flex: 1
    },
    iconLeft: /*#__PURE__*/React.createElement(I, {
      name: inv.status === "sent" ? "check" : "mail",
      size: 16
    })
  }, inv.status === "sent" ? "Sent" : isPaid ? "Paid" : "Send"))));
}
function Row({
  label,
  value,
  muted,
  green
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      fontSize: "var(--fs-body-sm)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--text-muted)"
    }
  }, label), /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: "var(--fw-medium)",
      color: green ? "var(--success)" : muted ? "var(--text-muted)" : "var(--text-strong)"
    }
  }, value));
}

/* ---------- Checkout (standalone, no app nav) ---------- */
function Checkout({
  invoice,
  profile,
  onDone,
  onCancel
}) {
  const [step, setStep] = React.useState("form"); // form | processing | success
  const [name, setName] = React.useState(invoice.clientName);
  const [card, setCard] = React.useState("4242 4242 4242 4242");
  const [exp, setExp] = React.useState("09 / 28");
  const [cvc, setCvc] = React.useState("123");
  const amt = SD.fmt(invoice.calc.totalDue);
  function pay() {
    setStep("processing");
    setTimeout(() => setStep("success"), 1500);
  }
  if (step === "success") {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        minHeight: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "40px 24px",
        gap: "6px"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: "66px",
        height: "66px",
        borderRadius: "50%",
        background: "#E9F1EC",
        color: "var(--success)",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: "14px"
      }
    }, /*#__PURE__*/React.createElement(I, {
      name: "check-circle",
      size: 34
    })), /*#__PURE__*/React.createElement("h1", {
      style: {
        fontSize: "var(--fs-h2)",
        fontWeight: "var(--fw-light)",
        color: "var(--text-strong)"
      }
    }, "Payment successful"), /*#__PURE__*/React.createElement("p", {
      style: {
        fontSize: "var(--fs-body)",
        color: "var(--text-muted)"
      }
    }, /*#__PURE__*/React.createElement("strong", {
      style: {
        color: "var(--text-body)",
        fontWeight: "var(--fw-medium)"
      }
    }, amt), " received"), /*#__PURE__*/React.createElement("p", {
      style: {
        fontSize: "12.5px",
        color: "var(--text-subtle)",
        marginBottom: "26px"
      }
    }, "A receipt has been emailed to you."), /*#__PURE__*/React.createElement(B2, {
      variant: "primary",
      onClick: onDone
    }, "Back to invoice"), /*#__PURE__*/React.createElement("p", {
      style: {
        marginTop: "20px",
        fontSize: "11.5px",
        color: "var(--text-subtle)",
        display: "inline-flex",
        alignItems: "center",
        gap: "5px"
      }
    }, /*#__PURE__*/React.createElement(I, {
      name: "lock",
      size: 12
    }), " Secured by SnapBill"));
  }
  return /*#__PURE__*/React.createElement("div", {
    style: {
      minHeight: "100%",
      display: "flex",
      flexDirection: "column"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      height: "52px",
      padding: "0 18px",
      borderBottom: "1px solid var(--border-hairline)"
    }
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onCancel,
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: "6px",
      background: "none",
      border: "none",
      color: "var(--text-muted)",
      fontSize: "var(--fs-body-sm)",
      cursor: "pointer"
    }
  }, /*#__PURE__*/React.createElement(I, {
    name: "arrow-left",
    size: 16
  }), " Back"), /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: "6px",
      fontSize: "12.5px",
      color: "var(--text-muted)"
    }
  }, /*#__PURE__*/React.createElement(I, {
    name: "lock",
    size: 14,
    color: "var(--success)"
  }), " Secure payment")), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      padding: "28px 22px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: "var(--surface-card)",
      border: "1px solid var(--border-hairline)",
      borderRadius: "var(--radius-lg)",
      padding: "22px",
      boxShadow: "var(--shadow-sm)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center",
      paddingBottom: "18px",
      marginBottom: "18px",
      borderBottom: "1px solid var(--border-hairline)"
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: "var(--fs-body-sm)",
      color: "var(--text-muted)"
    }
  }, "Amount due"), /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: "4px",
      fontFamily: "var(--font-display)",
      fontSize: "var(--fs-display-m)",
      fontWeight: "var(--fw-light)",
      letterSpacing: "var(--ls-display)",
      color: "var(--text-strong)"
    }
  }, amt), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: "12.5px",
      color: "var(--text-subtle)"
    }
  }, "To ", profile.name)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gap: "13px"
    }
  }, /*#__PURE__*/React.createElement(In2, {
    label: "Name on card",
    value: name,
    onChange: e => setName(e.target.value)
  }), /*#__PURE__*/React.createElement(In2, {
    label: "Card number",
    value: card,
    onChange: e => setCard(e.target.value)
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "12px"
    }
  }, /*#__PURE__*/React.createElement(In2, {
    label: "Expiry",
    value: exp,
    onChange: e => setExp(e.target.value)
  }), /*#__PURE__*/React.createElement(In2, {
    label: "CVC",
    value: cvc,
    onChange: e => setCvc(e.target.value)
  })), /*#__PURE__*/React.createElement(B2, {
    variant: "accent",
    size: "lg",
    onClick: pay,
    disabled: step === "processing",
    style: {
      width: "100%",
      marginTop: "4px"
    },
    iconLeft: /*#__PURE__*/React.createElement(I, {
      name: step === "processing" ? "loader" : "lock",
      size: 16,
      style: step === "processing" ? {
        animation: "snapSpin 0.9s linear infinite"
      } : {}
    })
  }, step === "processing" ? "Processing…" : `Pay ${amt}`), /*#__PURE__*/React.createElement("p", {
    style: {
      textAlign: "center",
      fontSize: "11.5px",
      color: "var(--text-subtle)",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "5px"
    }
  }, /*#__PURE__*/React.createElement(I, {
    name: "lock",
    size: 11
  }), " Test mode \u2014 no real charges")))));
}

/* ---------- Root shell ---------- */
function SnapApp() {
  const [screen, setScreen] = React.useState("new");
  const [invoices, setInvoices] = React.useState(() => SD.seedInvoices());
  const [currentId, setCurrentId] = React.useState(null);
  const profile = SD.DEFAULT_PROFILE;
  const scrollRef = React.useRef(null);
  const current = invoices.find(i => i.id === currentId);
  React.useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = 0;
  }, [screen, currentId]);
  function goto(key) {
    setScreen(key);
  }
  function onGenerate(inv) {
    setInvoices(prev => [inv, ...prev]);
    setCurrentId(inv.id);
    setScreen("invoice");
  }
  function openInvoice(id) {
    setCurrentId(id);
    setScreen("invoice");
  }
  function setStatus(id, status) {
    setInvoices(prev => prev.map(i => i.id === id ? {
      ...i,
      status
    } : i));
  }
  const isCheckout = screen === "pay";
  const showNav = screen === "new" || screen === "history" || screen === "settings";
  return /*#__PURE__*/React.createElement("div", {
    style: {
      minHeight: "100vh",
      background: "var(--surface-sunken)",
      display: "flex",
      justifyContent: "center",
      alignItems: "flex-start",
      padding: "26px 16px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: "100%",
      maxWidth: "430px",
      height: "860px",
      maxHeight: "calc(100vh - 52px)",
      background: "var(--surface-page)",
      borderRadius: "26px",
      border: "1px solid var(--border-default)",
      boxShadow: "var(--shadow-lg)",
      overflow: "hidden",
      display: "flex",
      flexDirection: "column",
      position: "relative"
    }
  }, showNav && /*#__PURE__*/React.createElement(Nav2, {
    brand: "SnapBill",
    logo: /*#__PURE__*/React.createElement(SP.SnapMark, null),
    active: screen,
    items: SP.NAV(),
    onNavigate: goto
  }), /*#__PURE__*/React.createElement("div", {
    ref: scrollRef,
    style: {
      flex: 1,
      overflowY: "auto",
      overflowX: "hidden",
      padding: isCheckout ? 0 : "20px 18px 0"
    }
  }, screen === "new" && /*#__PURE__*/React.createElement(SP.NewInvoice, {
    profile: profile,
    onGenerate: onGenerate
  }), screen === "history" && /*#__PURE__*/React.createElement(SP.History, {
    invoices: invoices,
    onOpen: openInvoice
  }), screen === "settings" && /*#__PURE__*/React.createElement(SP.Settings, {
    profile: profile
  }), screen === "invoice" && current && /*#__PURE__*/React.createElement(InvoiceView, {
    invoice: current,
    profile: profile,
    onBack: () => setScreen("new"),
    onPay: () => setScreen("pay"),
    onSend: () => setStatus(current.id, "sent")
  }), screen === "pay" && current && /*#__PURE__*/React.createElement(Checkout, {
    invoice: current,
    profile: profile,
    onCancel: () => setScreen("invoice"),
    onDone: () => {
      setStatus(current.id, "paid");
      setScreen("invoice");
    }
  }))));
}
window.SnapApp = SnapApp;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/snapbill/Invoice.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Homepage.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* Decora homepage recreation — composes the design-system components.
   Loaded after the DS bundle + Media.jsx. Exports window.Homepage. */

const DS = window.DecoraDesignSystem_779afc;
const {
  NavBar,
  Footer,
  Button,
  Eyebrow,
  ServiceCard,
  Stat,
  LogoMarquee,
  Tag,
  Input,
  Select
} = DS;
const Media = window.MediaPlaceholder;
const NAV_LINKS = [{
  label: "Services"
}, {
  label: "Capabilities"
}, {
  label: "Facility"
}, {
  label: "About"
}, {
  label: "Contact"
}];

/* ---------- Hero ---------- */
function Hero() {
  return /*#__PURE__*/React.createElement("section", {
    style: {
      position: "relative",
      background: "var(--navy-900)",
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0
    }
  }, /*#__PURE__*/React.createElement(Media, {
    tone: "deep",
    ratio: "auto",
    radius: "0",
    style: {
      height: "100%",
      aspectRatio: "auto"
    },
    label: "Hero \u2014 looping coating-line process reel"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      background: "linear-gradient(90deg, rgba(15,29,52,0.92) 0%, rgba(15,29,52,0.72) 45%, rgba(15,29,52,0.35) 100%)"
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      maxWidth: "var(--content-max)",
      margin: "0 auto",
      padding: "0 var(--gutter)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      minHeight: "88vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      maxWidth: "760px",
      paddingTop: "90px",
      paddingBottom: "80px"
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, {
    color: "light",
    style: {
      marginBottom: "26px"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: "28px",
      height: "1px",
      background: "var(--teal-500)"
    }
  }), "Powder Coating \xB7 Sublimation \xB7 Architectural"), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontSize: "var(--fs-display-xl)",
      lineHeight: "var(--lh-tight)",
      letterSpacing: "var(--ls-display)",
      color: "var(--cream-50)",
      fontWeight: "var(--fw-light)",
      margin: 0
    }
  }, "The finish,", /*#__PURE__*/React.createElement("br", null), "when it matters."), /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: "28px",
      maxWidth: "520px",
      fontSize: "var(--fs-body-lg)",
      lineHeight: "var(--lh-relaxed)",
      color: "var(--navy-200)",
      fontWeight: "var(--fw-light)"
    }
  }, "Precision powder coating, decorative sublimation, and spec-grade architectural finishing \u2014 engineered for the projects where the finish has to last."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "14px",
      marginTop: "40px",
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "light",
    size: "lg",
    iconRight: /*#__PURE__*/React.createElement("span", null, "\u2192")
  }, "Request a quote"), /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    size: "lg",
    style: {
      color: "var(--cream-50)",
      border: "1px solid rgba(255,255,255,0.22)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: "10px"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: "26px",
      height: "26px",
      borderRadius: "50%",
      border: "1px solid rgba(255,255,255,0.4)",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "9px"
    }
  }, "\u25B6"), "Watch the process"))))));
}

/* ---------- Positioning statement ---------- */
function Positioning() {
  return /*#__PURE__*/React.createElement("section", {
    style: {
      background: "var(--surface-page)",
      padding: "var(--section-y) 0"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: "var(--content-max)",
      margin: "0 auto",
      padding: "0 var(--gutter)",
      display: "grid",
      gridTemplateColumns: "1fr 1.1fr",
      gap: "clamp(2rem, 6vw, 6rem)",
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Eyebrow, {
    style: {
      marginBottom: "20px"
    }
  }, "Why Decora"), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontSize: "var(--fs-display-m)",
      lineHeight: "1.08",
      letterSpacing: "var(--ls-display)",
      fontWeight: "var(--fw-light)",
      color: "var(--text-strong)",
      margin: 0
    }
  }, "Clean enough for architects. Technical enough for manufacturers.")), /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: "440px"
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: "var(--fs-body-lg)",
      lineHeight: "var(--lh-relaxed)",
      color: "var(--text-body)",
      fontWeight: "var(--fw-light)",
      margin: 0
    }
  }, "From a single profile to a full building envelope, Decora delivers consistent colour, controlled film build, and finishes that hold up to the field. You get the throughput of a production line with the discipline of a spec sheet."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "10px",
      flexWrap: "wrap",
      marginTop: "26px"
    }
  }, /*#__PURE__*/React.createElement(Tag, {
    variant: "outline"
  }, "AAMA 2604 / 2605"), /*#__PURE__*/React.createElement(Tag, {
    variant: "outline"
  }, "Vertical line to 7 m"), /*#__PURE__*/React.createElement(Tag, {
    variant: "outline"
  }, "In-house pretreatment"), /*#__PURE__*/React.createElement(Tag, {
    variant: "outline"
  }, "Batch traceability")))));
}

/* ---------- Services ---------- */
function Services() {
  const services = [{
    index: 1,
    eyebrow: "Powder Coating",
    title: "Durable colour, applied with control",
    description: "Consistent film build and cure across high volumes — batch after batch, to a documented spec.",
    cta: "See finishes"
  }, {
    index: 2,
    eyebrow: "Sublimation",
    title: "Wood-grain on aluminum, warranted",
    description: "Decorative finishes that read like timber with the performance of coated metal.",
    cta: "Explore patterns"
  }, {
    index: 3,
    eyebrow: "Architectural",
    title: "Spec-grade finishing for the envelope",
    description: "Façades, profiles, railings, and building products finished to architectural standards.",
    cta: "View capabilities"
  }];
  return /*#__PURE__*/React.createElement("section", {
    style: {
      background: "var(--surface-sunken)",
      padding: "var(--section-y) 0"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: "var(--content-max)",
      margin: "0 auto",
      padding: "0 var(--gutter)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "flex-end",
      justifyContent: "space-between",
      gap: "24px",
      marginBottom: "48px",
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Eyebrow, {
    style: {
      marginBottom: "16px"
    }
  }, "What we do"), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontSize: "var(--fs-display-m)",
      letterSpacing: "var(--ls-display)",
      fontWeight: "var(--fw-light)",
      color: "var(--text-strong)",
      margin: 0
    }
  }, "Three ways we finish")), /*#__PURE__*/React.createElement(Button, {
    variant: "secondary"
  }, "All capabilities")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(3, 1fr)",
      gap: "24px"
    }
  }, services.map(s => /*#__PURE__*/React.createElement(ServiceCard, _extends({
    key: s.index
  }, s))))));
}

/* ---------- Proof / trust ---------- */
function Proof() {
  const stats = [{
    value: "25",
    suffix: "+",
    label: "Years finishing metal",
    sub: "Niagara region, since 1999"
  }, {
    value: "7",
    suffix: "m",
    label: "Vertical line height",
    sub: "Architectural profiles"
  }, {
    value: "48",
    suffix: "hr",
    label: "Typical quote turnaround",
    sub: "On standard scopes"
  }, {
    value: "99.2",
    suffix: "%",
    label: "On-time delivery",
    sub: "Trailing 12 months"
  }];
  return /*#__PURE__*/React.createElement("section", {
    style: {
      background: "var(--navy-700)",
      padding: "var(--section-y) 0",
      color: "var(--cream-50)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: "var(--content-max)",
      margin: "0 auto",
      padding: "0 var(--gutter)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "0.9fr 1.1fr",
      gap: "clamp(2rem, 6vw, 5rem)",
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Eyebrow, {
    color: "light",
    style: {
      marginBottom: "20px"
    }
  }, "Proof, not promises"), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontSize: "var(--fs-display-m)",
      letterSpacing: "var(--ls-display)",
      fontWeight: "var(--fw-light)",
      color: "var(--cream-50)",
      margin: "0 0 22px"
    }
  }, "Built for the projects you can't afford to redo"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: "var(--fs-body)",
      lineHeight: "var(--lh-relaxed)",
      color: "var(--navy-200)",
      fontWeight: "var(--fw-light)",
      maxWidth: "440px",
      margin: 0
    }
  }, "Certified systems, documented process control, and a delivery record that holds up to a construction schedule."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "10px",
      flexWrap: "wrap",
      marginTop: "26px"
    }
  }, /*#__PURE__*/React.createElement(Tag, {
    variant: "navy",
    style: {
      border: "1px solid rgba(255,255,255,0.18)",
      background: "rgba(255,255,255,0.06)"
    }
  }, "AAMA Certified"), /*#__PURE__*/React.createElement(Tag, {
    variant: "navy",
    style: {
      border: "1px solid rgba(255,255,255,0.18)",
      background: "rgba(255,255,255,0.06)"
    }
  }, "ISO process control"), /*#__PURE__*/React.createElement(Tag, {
    variant: "navy",
    style: {
      border: "1px solid rgba(255,255,255,0.18)",
      background: "rgba(255,255,255,0.06)"
    }
  }, "Warranty-backed"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "1px",
      background: "var(--border-on-dark)",
      border: "1px solid var(--border-on-dark)"
    }
  }, stats.map((s, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      background: "var(--navy-700)",
      padding: "32px 28px"
    }
  }, /*#__PURE__*/React.createElement(Stat, _extends({}, s, {
    tone: "light"
  }))))))));
}

/* ---------- Partners marquee (two rows) ---------- */
function Partners() {
  const rowA = ["NORTHGATE", "ELLISON METALS", "VANTA", "MERIDIAN", "COASTLINE", "ATELIER 9"];
  const rowB = ["FORMWORKS", "KESTREL", "BRIDGE & CO", "HALCYON", "STRATA", "NORDIC FAB"];
  const logo = (n, i) => /*#__PURE__*/React.createElement("span", {
    key: i,
    style: {
      fontFamily: "var(--font-sans)",
      fontWeight: "var(--fw-medium)",
      fontSize: "clamp(18px, 2vw, 24px)",
      letterSpacing: "0.02em",
      color: "var(--navy-400)",
      whiteSpace: "nowrap"
    }
  }, n);
  return /*#__PURE__*/React.createElement("section", {
    style: {
      background: "var(--surface-page)",
      padding: "var(--section-y) 0"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: "var(--content-max)",
      margin: "0 auto",
      padding: "0 var(--gutter) 36px"
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, {
    color: "muted"
  }, "Trusted by fabricators, builders & specifiers")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "28px"
    }
  }, /*#__PURE__*/React.createElement(LogoMarquee, {
    speed: 42
  }, rowA.map(logo)), /*#__PURE__*/React.createElement(LogoMarquee, {
    speed: 50,
    reverse: true
  }, rowB.map(logo))));
}

/* ---------- Final CTA ---------- */
function FinalCTA() {
  return /*#__PURE__*/React.createElement("section", {
    style: {
      background: "var(--surface-sunken)",
      padding: "var(--section-y) 0"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: "var(--content-max)",
      margin: "0 auto",
      padding: "0 var(--gutter)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      overflow: "hidden",
      borderRadius: "var(--radius-xl)",
      background: "linear-gradient(135deg, #1d345c, #0f1d34)",
      padding: "clamp(2.5rem, 6vw, 5.5rem)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    "aria-hidden": true,
    style: {
      position: "absolute",
      inset: 0,
      backgroundImage: "radial-gradient(rgba(143,204,199,0.7) 1.4px, transparent 1.7px)",
      backgroundSize: "20px 20px",
      opacity: 0.16,
      maskImage: "linear-gradient(120deg, transparent 40%, #000)",
      WebkitMaskImage: "linear-gradient(120deg, transparent 40%, #000)"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      display: "grid",
      gridTemplateColumns: "1.2fr 0.8fr",
      gap: "48px",
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", {
    style: {
      fontSize: "var(--fs-display-l)",
      lineHeight: "1.05",
      letterSpacing: "var(--ls-display)",
      fontWeight: "var(--fw-light)",
      color: "var(--cream-50)",
      margin: 0
    }
  }, "Get a finish quote with real numbers."), /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: "20px",
      maxWidth: "440px",
      fontSize: "var(--fs-body-lg)",
      lineHeight: "var(--lh-relaxed)",
      color: "var(--navy-200)",
      fontWeight: "var(--fw-light)"
    }
  }, "Send drawings or a parts list \u2014 we'll come back with scope, finish options, and lead time.")), /*#__PURE__*/React.createElement("div", {
    style: {
      background: "rgba(255,255,255,0.04)",
      border: "1px solid rgba(255,255,255,0.12)",
      borderRadius: "var(--radius-lg)",
      padding: "26px",
      display: "flex",
      flexDirection: "column",
      gap: "16px"
    }
  }, /*#__PURE__*/React.createElement(Input, {
    label: "",
    placeholder: "Work email"
  }), /*#__PURE__*/React.createElement(Select, {
    options: ["Powder Coating", "Sublimation", "Architectural Finishes"]
  }), /*#__PURE__*/React.createElement(Button, {
    variant: "accent",
    size: "lg",
    iconRight: /*#__PURE__*/React.createElement("span", null, "\u2192")
  }, "Request a quote"))))));
}
function Homepage() {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: "var(--surface-page)"
    }
  }, /*#__PURE__*/React.createElement(NavBar, {
    variant: "onDark",
    logo: /*#__PURE__*/React.createElement("img", {
      src: "../../assets/brand/decora-logo-white.png",
      height: "26",
      alt: "Decora"
    }),
    links: NAV_LINKS
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "-72px"
    }
  }, /*#__PURE__*/React.createElement(Hero, null)), /*#__PURE__*/React.createElement(Positioning, null), /*#__PURE__*/React.createElement(Services, null), /*#__PURE__*/React.createElement(Proof, null), /*#__PURE__*/React.createElement(Partners, null), /*#__PURE__*/React.createElement(FinalCTA, null), /*#__PURE__*/React.createElement(Footer, {
    logo: /*#__PURE__*/React.createElement("img", {
      src: "../../assets/brand/decora-logo-white.png",
      height: "28",
      alt: "Decora"
    }),
    tagline: "Premium powder coating, sublimation, and architectural finishing. St. Catharines, Ontario.",
    contact: /*#__PURE__*/React.createElement(React.Fragment, null, "info@decora.ca", /*#__PURE__*/React.createElement("br", null), "+1 905 000 0000"),
    columns: [{
      title: "Services",
      links: [{
        label: "Powder Coating"
      }, {
        label: "Sublimation"
      }, {
        label: "Architectural Finishes"
      }]
    }, {
      title: "Company",
      links: [{
        label: "About"
      }, {
        label: "Facility"
      }, {
        label: "Careers"
      }]
    }, {
      title: "Resources",
      links: [{
        label: "Spec sheets"
      }, {
        label: "Warranties"
      }, {
        label: "Request a quote"
      }]
    }]
  }));
}
window.Homepage = Homepage;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Homepage.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Media.jsx
try { (() => {
/* Placeholder media blocks for the Decora homepage recreation.
   No real facility photography was provided, so these render premium,
   brand-tinted stand-ins that communicate the intended shot. Swap the
   <Media> calls for real <img>/<video> when assets arrive. */

function MediaPlaceholder({
  label,
  ratio = "16 / 9",
  tone = "navy",
  radius = "var(--radius-lg)",
  style = {},
  dots = true,
  children
}) {
  const tones = {
    navy: "linear-gradient(135deg, #1d345c, #0f1d34)",
    deep: "linear-gradient(160deg, #16294a, #0f1d34)",
    teal: "linear-gradient(135deg, #16294a, #0e6b65)",
    steel: "linear-gradient(135deg, #3b598c, #1d345c)"
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: "100%",
      aspectRatio: ratio,
      background: tones[tone] || tones.navy,
      borderRadius: radius,
      overflow: "hidden",
      ...style
    }
  }, dots && /*#__PURE__*/React.createElement("div", {
    "aria-hidden": true,
    style: {
      position: "absolute",
      inset: 0,
      backgroundImage: "radial-gradient(rgba(143,204,199,0.8) 1.3px, transparent 1.6px)",
      backgroundSize: "18px 18px",
      opacity: 0.18,
      maskImage: "linear-gradient(135deg, #000, transparent 72%)",
      WebkitMaskImage: "linear-gradient(135deg, #000, transparent 72%)"
    }
  }), children, label && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: "16px",
      bottom: "14px",
      display: "flex",
      alignItems: "center",
      gap: "8px",
      fontFamily: "var(--font-sans)",
      fontSize: "12px",
      fontWeight: "var(--fw-light)",
      fontStyle: "italic",
      letterSpacing: "0.01em",
      color: "rgba(255,255,255,0.62)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: "16px",
      height: "1px",
      background: "rgba(255,255,255,0.4)"
    }
  }), label));
}
window.MediaPlaceholder = MediaPlaceholder;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Media.jsx", error: String((e && e.message) || e) }); }

__ds_ns.AppNav = __ds_scope.AppNav;

__ds_ns.InvoiceStatus = __ds_scope.InvoiceStatus;

__ds_ns.MoneyField = __ds_scope.MoneyField;

__ds_ns.LogoMarquee = __ds_scope.LogoMarquee;

__ds_ns.ServiceCard = __ds_scope.ServiceCard;

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Eyebrow = __ds_scope.Eyebrow;

__ds_ns.Stat = __ds_scope.Stat;

__ds_ns.Tag = __ds_scope.Tag;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.Select = __ds_scope.Select;

__ds_ns.Textarea = __ds_scope.Textarea;

__ds_ns.Footer = __ds_scope.Footer;

__ds_ns.NavBar = __ds_scope.NavBar;

})();
