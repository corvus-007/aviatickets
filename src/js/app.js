import './plugins/index';
import locations from "./store/locations";
import '../css/style.css';
import formUI from "./views/form";
import currencyUI from "./views/currency";
import ticketsUi from "./views/tickets";

document.addEventListener('DOMContentLoaded', () => {
  initApp();

  const form = formUI.form;

  // Events
  form.addEventListener('submit', evt => {
    evt.preventDefault();

    onFormSubmit();
  })

  // Handlers
  async function initApp() {
    await locations.init();
    formUI.setAutocompleteData(locations.shortCitiesList);
  }

  async function onFormSubmit() {
    // собрать данные из инпутов
    const origin = locations.getCityCodeByKey(formUI.originValue);
    const destination = locations.getCityCodeByKey(formUI.destinationValue);
    const depart_date = formUI.departDateValue;
    const return_date = formUI.returnDateValue;
    const currency = currencyUI.currencyValue;

    await locations.fetchTickets({
      origin,
      destination,
      depart_date,
      return_date,
      currency,
    });

    console.log(currencyUI)

    ticketsUi.renderTickets(locations.lastSearch);
  }
});