class TicketsController < ApplicationController

  def index
    render json: Ticket.all, status: :ok
  end

  def show
    ticket = Ticket.find(params[:id])
    render json: ticket, status: :ok
  end
end
