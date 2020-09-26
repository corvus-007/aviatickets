import currencyUI from "./currency";

class TicketsUI {
  constructor(currency) {
    this.container = document.querySelector('.tickets-sections')
    this.getCurrencySymbol = currency.getCurrencySymbol.bind(currency);
  }

  renderTickets(tickets) {
    this.clearContainer();

    if (!tickets.length) {
      this.showEmptyMessage();
      return;
    }

    let fragment = '';
    const currency = this.getCurrencySymbol();

    tickets.forEach(ticket => {
      const template = TicketsUI.ticketTemplate(ticket, currency);
      fragment += template;
    });

    this.container.insertAdjacentHTML('afterbegin', fragment);
  }

  clearContainer() {
    this.container.innerHTML = '';
  }

  showEmptyMessage() {
    const template = TicketsUI.emptyMsgTemplate();
    this.container.insertAdjacentHTML('afterbegin', template);
  }

  static emptyMsgTemplate() {
    return `
<li class="tickets-empty-res-msg">По вашему запросу билетов не найдено</li>
    `;
  }

  static ticketTemplate(ticket, currency) {
    return `
<li>
  <img src="${ticket.airline_logo}" alt="">
  <b>${ticket.airline_name}</b>
  <p>Откуда: ${ticket.origin_name}</p>
  <p>Куда: ${ticket.destination_name}</p>
  <p>${ticket.departure_at}</p>
  <p>${ticket.price} ${currency}</p>
  <p>Пересадок: ${ticket.transfers}</p>
  <p>${ticket.flight_number}</p>
</li>
    `;
  }
}

const ticketsUi = new TicketsUI(currencyUI);

export default ticketsUi;