import i18next from 'i18next';
import {RoutesEndpoint} from "./utils/RoutesEndpoint";
import EAuthRole from "./utils/auth/EAuthRole";

export default {
  items: [
    {
      name: 'Dashboard',
      url: RoutesEndpoint.DASHBOARD,
      icon: 'icon-speedometer',
      badge: {
        variant: 'info',
        text: 'SOON',
      },
      restricted: EAuthRole.BASIC
    },
    {
      title: true,
      name: i18next.t('nav.activity.title', 'Activity Tracker'),
      wrapper: {            // optional wrapper object
        element: '',        // required valid HTML5 element tag
        attributes: {}        // optional valid JS object with JS API naming ex: { className: "my-class", style: { fontFamily: "Verdana" }, id: "my-id"}
      },
      class: '',             // optional class names space delimited list for title item ex: "text-center"
      restricted: EAuthRole.BASIC
    },
    {
      name: i18next.t('nav.activity.player.title', 'Player Activity'),
      url: RoutesEndpoint.PLAYER_Activity,
      icon: 'icon-chart',
      restricted: EAuthRole.BASIC
    },
    {
      name: i18next.t('nav.activity.galaxy.title', 'Global Activity'),
      url: RoutesEndpoint.PLAYER_Galaxy,
      icon: 'icon-globe',
      restricted: EAuthRole.BASIC
    },
    {
      title: true,
      name: i18next.t('nav.data.title', 'Data Tools'),
      wrapper: {
        element: '',
        attributes: {}
      },
      class: '',
      restricted: EAuthRole.BASIC
    },
    {
      name: i18next.t('nav.data.colonial.title', 'Colonial'),
      url: RoutesEndpoint.DATA_Colonial,
      icon: 'fa fa-ravelry',
      badge: {
        variant: 'info',
        text: 'SOON',
      },
      class: 'disabled',
      restricted: EAuthRole.BASIC
    },
    {
      name: i18next.t('nav.data.military.title', 'Military'),
      url: RoutesEndpoint.DATA_Military,
      icon: 'fa fa-fighter-jet',
      badge: {
        variant: 'info',
        text: 'SOON',
      },
      class: 'disabled',
      restricted: EAuthRole.BASIC
    },
    {
      name: i18next.t('nav.data.spy.title', 'Spy Reports'),
      url: RoutesEndpoint.DATA_Spy,
      icon: 'fa fa-eye',
      restricted: EAuthRole.BASIC
    },
    {
      title: true,
      name: i18next.t('nav.info.title', 'Information'),
      wrapper: {
        element: '',
        attributes: {}
      },
      class: ''
    },
    {
      name: i18next.t('nav.info.howto.title', 'How to start'),
      url: RoutesEndpoint.HOWTOSTART,
      icon: 'icon-wrench',
    },
    {
      name: i18next.t('nav.info.help.title', 'Get Help'),
      url: RoutesEndpoint.GETHELP,
      icon: 'icon-question',
      restricted: EAuthRole.BASIC
    }
  ]
}
