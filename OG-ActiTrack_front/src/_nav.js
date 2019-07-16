import i18next from 'i18next';
import {RoutesEndpoint} from "./Utils/RoutesEndpoint";


export default {
    items: [
      {
        name: 'Dashboard',
        url: RoutesEndpoint.DASHBOARD,
        icon: 'icon-speedometer',
        /*badge: {
          variant: 'info',
          text: 'NEW',
        },*/
      },
      {
        title: true,
        name: i18next.t('nav.activity.title'),
        wrapper: {            // optional wrapper object
          element: '',        // required valid HTML5 element tag
          attributes: {}        // optional valid JS object with JS API naming ex: { className: "my-class", style: { fontFamily: "Verdana" }, id: "my-id"}
        },
        class: ''             // optional class names space delimited list for title item ex: "text-center"
      },
      {
        name: i18next.t('nav.activity.player.title'),
        url: RoutesEndpoint.PLAYER_Activity,
        icon: 'icon-chart',
        /*badge: {
          variant: 'info',
          text: 'NEW',
        },*/
      },
      {
        name: i18next.t('nav.activity.galaxy.title'),
        url: RoutesEndpoint.PLAYER_Galaxy,
        icon: 'icon-globe',
        /*badge: {
          variant: 'info',
          text: 'NEW',
        },*/
      },
      {
        title: true,
        name: i18next.t('nav.data.title'),
        wrapper: {
          element: '',
          attributes: {}
        },
        class: ''
      },
      {
        name: i18next.t('nav.data.colonial.title'),
        url: RoutesEndpoint.DATA_Colonial,
        icon: 'fa fa-ravelry',
        badge: {
          variant: 'info',
          text: 'SOON',
        },
        class: 'disabled'
      },
      {
        name: i18next.t('nav.data.military.title'),
        url: RoutesEndpoint.DATA_Military,
        icon: 'fa fa-fighter-jet',
        badge: {
          variant: 'info',
          text: 'SOON',
        },
        class: 'disabled'
      },
    ],
  };
