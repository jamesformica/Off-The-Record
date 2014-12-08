module UserHelper

	class AccentColour
		
		@@colours = ["#4ECDC4", "#C7F464", "#FF6B6B", "#F67280", "#C06C84", "#0ABFBC", "#F56991", "#FF9F80", "#D1F2A5"]

		def self.get_colours
			@@colours
		end

		def self.get_random_colour
			@@colours.sample
		end

		def self.get_colour_from_name(name)
			firstLetter = name[0]
			@@colours[firstLetter.ord % (@@colours.length - 1)]
		end

	end	
end