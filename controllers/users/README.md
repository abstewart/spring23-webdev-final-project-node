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

email for user

required ?

### role ###
Type: enum: [USER, ADMIN]

Is this user an admin?

Defaults to user


## Questions to consider ##
Should preferences be stored in the user? Or as a separate collection in the database?



