require "nodejs"

class HomeController < ApplicationController
  LAYOUT = false

  def index
    code = File.read("build/bundle.js")
    replaced_code = code.gsub("_PATH") { "#{request.url}" }
    Nodejs.eval(replaced_code)
  end
end
