Rails.application.routes.draw do
  resources :tickets, only: [:create]
  resources :users, only: [:show, :create]
  # resources :cast_members
  resources :productions, only: [ :index, :show, :create, :update, :destroy]
  # Custom Route
  post "/login", to: "sessions#create"
  # delete session => logout route
  delete "/logout", to: "sessions#delete"
  # users#show => auth route
  get "/auth", to: "users#show"
  
  # get "/welcome", to: "productions#welcome"
  # get "/welcome/:id", to: "productions#welcome_show"

end
