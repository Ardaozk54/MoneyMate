import { useEffect, useRef, useState } from "react";
import { Check, Languages } from "lucide-react";
import { useSettings } from "../../context/SettingsContext";
import "./SettingsMenu.css";

function LanguageMenu({ variant = "topbar", collapsed = false }) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const { language, setLanguage, t } = useSettings();

  useEffect(() => {
    function closeMenu(event) {
      if (!menuRef.current?.contains(event.target)) {
        setOpen(false);
      }
    }

    document.addEventListener("pointerdown", closeMenu);
    return () => document.removeEventListener("pointerdown", closeMenu);
  }, []);

  function selectLanguage(nextLanguage) {
    setLanguage(nextLanguage);
    setOpen(false);
  }

  const triggerClass = variant === "sidebar" ? "sidebar-link" : "topbar-btn";

  return (
    <div className={`settings-menu settings-menu-${variant}`} ref={menuRef}>
      <button
        className={triggerClass}
        type="button"
        aria-label={t("switchLanguage")}
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
      >
        <Languages size={variant === "sidebar" ? 20 : 18} />
        {variant === "sidebar" && !collapsed && <span>{t("language")}</span>}
      </button>

      {open && (
        <div className="settings-popover" role="menu">
          <button
            type="button"
            className={language === "en" ? "selected" : ""}
            onClick={() => selectLanguage("en")}
          >
            <span>EN</span>
            {t("english")}
            {language === "en" && <Check size={15} />}
          </button>
          <button
            type="button"
            className={language === "tr" ? "selected" : ""}
            onClick={() => selectLanguage("tr")}
          >
            <span>TR</span>
            {t("turkish")}
            {language === "tr" && <Check size={15} />}
          </button>
        </div>
      )}
    </div>
  );
}

export default LanguageMenu;
