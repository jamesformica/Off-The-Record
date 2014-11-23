class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  # protect_from_forgery with: :exception
  protect_from_forgery

  include SessionsHelper
  
  after_filter :set_csrf_cookie_for_ng
  def set_csrf_cookie_for_ng
    cookies['XSRF-TOKEN'] = form_authenticity_token if protect_against_forgery?
  end

  protected
  def verified_request?
    super || form_authenticity_token == request.headers['X-XSRF-TOKEN']
  end


  def redirect_if_signed_in
    if signed_in?
      redirect_to profile_path
    end
  end

  def redirect_if_signed_out
    if !signed_in?
      redirect_to root_path
    end
  end

end
