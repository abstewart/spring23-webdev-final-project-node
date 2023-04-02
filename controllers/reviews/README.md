# Review Data Structure #

This represents a single review for a specific national park.

## Fields ##

### parkID ##
type: string

ID of the park being reviewed

### author ###
type: username of author

Who wrote the review

### Rating ###
type: integer 1-10? (may want to do 1-5 stars, allowing half stars)

### summary ###
Type: string
short summary of the review, sorta like a title

### message ###
Type: string

Actual review contents can go here. This should probably be limited to a certain length.

### likes ###

The number of likes for this review

### creation_date ###

The date review was created, uses Date.now as default

### hidden ###

boolean flag for if this review should be hidden. may not be used.
defaults to false

## Questions to consider ##
- 1-10 scale
- just likes

