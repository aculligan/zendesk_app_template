import $ from 'jquery';
import * as _ from 'underscore';

class View {
  constructor (opts) {
    this.afterRender = opts.afterRender;
  }

  renderTemplate (name, data) {
    let template = require(`../../templates/${name}.handlebars`);
    return template(data);
  }

  switchTo (name, data) {
    $('[data-main]').html(this.renderTemplate(name, data));
    _.isFunction(this.afterRender) && this.afterRender();
  }
}

export default View;
