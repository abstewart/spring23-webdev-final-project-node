# User Data Structure #

## Fields ##

### username ###
Type: string

Used for login
- required for registration
- must be unique

### password ###
Type: string

Password used for login
- required for registration

### first name ###
Type: string

user's first name

### last name ###
Type: string

user's last name

### email ###
Type: email

Must be unique

email for user

required ?

### role ###
Type: enum: [USER, ADMIN]

Is this user an admin?

Defaults to user

### liked_reviews ###
A list of review ids the user has liked. Used to mark review as liked or not.


## Questions to consider ##
- admin might be able to make other admin accounts?
- Should preferences be stored in the user? Or as a separate collection in the database?
- All fields required


### Other stuff ###
User should be able to like a park
User should be able to like a review (essentially an upvote)



