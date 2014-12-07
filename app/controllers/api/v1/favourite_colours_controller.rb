module Api
	module V1
		class FavouriteColoursController < ApplicationController
			include UserHelper

			respond_to :json

			def index
				puts AccentColour.get_colours
				render json: AccentColour.get_colours, status: :ok
			end

			def update
				user = User.find(params[:id])
				if user
					user.favourite_colour = params[:favourite_colour]
					if user.save
						render json: user, status: :ok
					else
						render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
					end
				else
					render json: { errors: ["Can't find user"] }, status: :not_found
				end
			end

			private
			def colour_params
				params.require(:colour).permit(:favourite_colour)
			end

		end
	end
end
