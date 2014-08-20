Rails.application.routes.draw do

  root 'static_pages#index'


  match '/sign_up', to: 'users#new', via: 'get'
  match '/profile', to: 'users#show', via: 'get'
  
  resources :users, only: [:new, :show]

  namespace :api, defaults: {format: 'json'} do
    namespace :v1 do
      resources :sessions, only: [:create, :destroy]
      resources :users, only: [:new, :create, :update, :destroy]
      resources :friendship_requests, only: [:index, :create, :destroy]
      resources :friendships, only: [:create, :destroy]

      match 'signout', to: 'sessions#destroy', via: 'delete'
      match 'users/current_user', to: 'users#get_current_user', via: 'get'
    end
  end

end
