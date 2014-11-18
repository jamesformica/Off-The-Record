puts "*** Creating Fake Data ***"
# ^.^ meow


puts "* Destroying All Data *"

puts " -destroying users"
User.destroy_all
puts " -destroy friendships"
Friendship.destroy_all
puts " -destroying friendship requests"
FriendshipRequest.destroy_all
puts " -destorying questions"
Question.destroy_all
UserQuestion.destroy_all
puts " -destroying answers"
Answer.destroy_all


puts "* Creating User Accounts *"

james = User.create(name: "James Formica", email: "james@example.com", username: "james", password: "password", password_confirmation: "password")
anastasia = User.create(name: "Anastasia Kostarelas", email: "anastasia@example.com", username: "anastasia", password: "password", password_confirmation: "password")
sam = User.create(name: "Samule Pezzimenti", email: "sam@example.com", username: "pezza", password: "password", password_confirmation: "password")
chris = User.create(name: "Chris Whiton", email: "chris@example.com", username: "chris", password: "password", password_confirmation: "password")
kaisha = User.create(name: "Kaisha Crupi", email: "kaisha@example.com", username: "kaisha", password: "password", password_confirmation: "password")
lauren = User.create(name: "Lauren Short", email: "lauren@example.com", username: "lauren", password: "password", password_confirmation: "password")
luke = User.create(name: "Luke Visona", email: "luke@example.com", username: "luke", password: "password", password_confirmation: "password")
mitch = User.create(name: "Mitchell Formica", email: "mitch@example.com", username: "mitch", password: "password", password_confirmation: "password")
adam = User.create(name: "Adam Kostarelas", email: "adam@example.com", username: "adam", password: "password", password_confirmation: "password")
alana = User.create(name: "Alana Cuci", email: "alana@example.com", username: "alana", password: "password", password_confirmation: "password")
bridie = User.create(name: "Bridie Waldron", email: "bridie@example.com", username: "bridie", password: "password", password_confirmation: "password")

puts "* Creating User Friendships *"
peeps = User.all

i = 0
while i < peeps.length do
	j = i + 1
	while j < peeps.length do
		Friendship.create(user_id: peeps[i].id, friend_id: peeps[j].id)
		Friendship.create(user_id: peeps[j].id, friend_id: peeps[i].id)
		j += 1
	end
	i += 1
end


puts "* Create Sample Question *"

randomAnswers = ["I love cates", "I need to go outside more", "Lets have a party!", "Where did my dog go?", "Are we there yet?", "I am a professional sleeper...", "What even are pineapples"]

question  = Question.create(question: "What is everyone thinking at this exact second???", owner_id: User.first.id)

i = 0
while i < peeps.length do

	peeps[i].user_questions.create(question_id: question.id)
	peeps[i].answers.create(question_id: question.id, answer: randomAnswers.sample)

	i += 1
end

