// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

import "./Bottom.scss";
import LanguageIcon from "@material-ui/icons/Language";
import FeedbackIcon from "@material-ui/icons/Feedback";

import { URL_FEEDBACK } from "../assets/config/const";

const EN_LANGUAGE_LIST = ["en", "en_US", "en_GB"];
export const ZH_LANGUAGE_LIST = ["zh", "zh_CN"];

const langList = [
  {
    id: "en",
    name: "English",
  },
  {
    id: "zh",
    name: "中文(简体)",
  },
];

const getCurrentLangObj = (id: string) => {
  let defaultItem = null;
  langList.forEach((item) => {
    if (id === item.id) {
      defaultItem = item;
    }
  });
  return defaultItem ? defaultItem : langList[0];
};

const Bottom: React.FC = () => {
  const { t, i18n } = useTranslation();
  if (EN_LANGUAGE_LIST.indexOf(i18n.language) >= 0) {
    i18n.language = "en";
  }
  if (ZH_LANGUAGE_LIST.indexOf(i18n.language) >= 0) {
    i18n.language = "zh";
  }
  const initLang = getCurrentLangObj(i18n.language);
  const [currentLang, setCurrentLang] = useState(initLang);

  const changeSelectLang: any = (event: any) => {
    const newLang = JSON.parse(event.target.getAttribute("data-lang"));
    setCurrentLang(newLang);
    i18n.changeLanguage(newLang.id);
    setShowLang(false);
  };

  const [showLang, setShowLang] = useState(false);
  const toggleShowLang = () => {
    setShowLang(!showLang);
  };
  return (
    <div className="page-bottom">
      <a rel="noopener noreferrer" href={URL_FEEDBACK} target="_blank">
        <div className="item feedback">
          <FeedbackIcon className="bottom-icon" fontSize="small" />
          {t("bottom.feedback")}
        </div>
      </a>
      <div className="item language">
        {showLang ? (
          <div className="language-select">
            <ul>
              {langList.map((item: any) => {
                return (
                  <li
                    key={item.id}
                    data-lang={JSON.stringify(item)}
                    onClick={changeSelectLang}
                  >
                    {item.name}
                  </li>
                );
              })}
            </ul>
          </div>
        ) : (
          ""
        )}
        <span onClick={toggleShowLang}>
          <LanguageIcon className="bottom-icon" fontSize="small" />{" "}
          <span>{currentLang.name}</span>
        </span>
      </div>

      <span className="privacy">{t("bottom.use")}</span>
      <span className="privacy">{t("bottom.privacy")}</span>
      <span className="notice">
        {`© 2008 -${new Date().getFullYear()}, `}
        {t("bottom.copy")}
      </span>
    </div>
  );
};

export default Bottom;
