import * as _ from 'underscore';
import $ from 'jquery';
import client from 'client';
import Handlebars from 'handlebars';
import I18n from 'i18n';
import Storage from 'storage';
import View from 'view';

class TicketSidebar {
  constructor(client, data) {
    this.client = client;
    this._metadata = data.metadata;
    this._context = data.context;
    this.storage = new Storage(this._metadata.installationId);

    this.view = new View({ afterRender: () => {
      this.init();
    }});

    this.getCurrentUser().then(this.renderMain.bind(this));
  }

  getCurrentUser() {
    return this.client.request({ url: '/api/v2/users/me.json' });
  }

  renderMain(data) {
    this.view.switchTo('ticket_sidebar', data.user);
  }

  init() {
    // App code goes in here
  }
}

export default TicketSidebar;
