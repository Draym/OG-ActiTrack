import React, {Component} from 'react';
import ButtonDropdown from "reactstrap/es/ButtonDropdown";
import DropdownToggle from "reactstrap/es/DropdownToggle";
import DropdownMenu from "reactstrap/es/DropdownMenu";
import DropdownItem from "reactstrap/es/DropdownItem";
import "./CLanguageCtrl.css";

import i18next from 'i18next';
import * as moment from "moment";


const gbIconLang = function(language) {
  if (language && language.indexOf('en') === 0) {
    return 'gb';
  }
  return language;
};

class CLanguageCtrl extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.changeLanguage = this.changeLanguage.bind(this);
    console.log("init: ", i18next.language);
    this.state = {
      dropdownOpen: false,
      language: (i18next.language ? i18next.language.toUpperCase() : i18next.language),
      flag: 'flag-icon-' + gbIconLang(i18next.language)
    };
    console.log(this.state)
  }
  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  changeLanguage(language) {
    console.log("change to ", language);
    i18next.changeLanguage(language).then(function(){
      moment.locale(language);
    });
    this.setState({
      dropdownOpen: false,
      language: language.toUpperCase(),
      flag: 'flag-icon-' + gbIconLang(language)
    });
  }

  render() {
    return (
        <ButtonDropdown style={{padding: 3 + 'px'}} isOpen={this.state.dropdownOpen} toggle={this.toggle}>
          <DropdownToggle caret color="secondary">
            <span className={this.state.flag + ' flag-icon'}/>
            <span className="spLanguage">{this.state.language}</span>
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem header>{i18next.t('language.options.choose')}</DropdownItem>
            <DropdownItem onClick={() => { this.changeLanguage('fr');}}>
              <span className="flag-icon-fr flag-icon"/>
              <span className="spLanguage">{i18next.t('language.fr')}</span>
            </DropdownItem>
            <DropdownItem onClick={() => { this.changeLanguage('en');}}>
              <span className="flag-icon-gb flag-icon"/>
              <span className="spLanguage">{i18next.t('language.gb')}</span>
            </DropdownItem>
          </DropdownMenu>
        </ButtonDropdown>
    );
  }
}

export default CLanguageCtrl;
