Rails.application.routes.draw do
  resources :productions, only: [:index, :show, :create, :update, :destroy]
  # index, show, create, update   except: [:destroy]
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  
  # Custom route: http_verb "/endpoint", to: "controller#action"
  get "/welcome", to: "application#hi"
  post "/users", to: "users#create"
end
