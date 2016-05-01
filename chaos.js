var IntervalTree = require('interval-tree2');
/*
Just have something with 2 spatial dimensions + health to start with
agents randomly choose some available action to execute

DimensionDescription
- 

Dimension
- constructor that takes dimension description
- can take ranges and return descriptions
  does this need to be relative? i.e. pass "from" and "to" intervals to decide relative description
  then again, some dimensions are absolute - health, for example?
- IntervalTree of agent extents in this dimension
- probably position and extent modification functions

Agent
- move: map dimension -> rate can change own pose and extent in that dimension
  act:  map dimension -> rate can change other's pose and extent in that dimension

Main game loop:
- make a map of agents
- make a map of dimensions
- keep iterating through agents and make them act
  for now "action" can be randomly choosing a dimension it can move in and doing so
  and just logging that it happened, maybe followed by a generated description of that agent
  to start, don't focus on actually producing sentences, just state the action that occurred

also seems like it'll quickly become obnoxious as you add dimensions -
"the yellow, runny, expansive, expanding (spatial extent velocity),
distant, solidifying (velocity), hurtling (spatial velocity), gaseous,
salmony blob"

for interaction can just iterate through intersecting agents and maybe act on them
bob stabs james
james looks grim
james heals bob
bob looks radiant
bob punts james
james looks ghoulish
james pushes bob
james sprints north

how to deal with inter-dimensional interaction?
like if have 0 health don't want to move anymore
- could have conditional values in dimension descriptions which reference other dimensions?
  maybe need >0 health to move
  perhaps could also express Agent parameters as functions of dimension values (in dimension descriptions?)
  maybe don't worry about this yet
- could adapt interval tree library to let you store objects/functions on intervals,
  then could populate dimension with different action functions agent would access depending on pose
  and could pass the function the agent and set of dimensions,
  so it could inspect other dimensional quantities...

Doesn't make sense to only be able to change the health of agents with adjacent health...
so have "relative" dimensions, "adjacent" dimensions?

Could cheat a bit and say that can act on any spatially overlapping agent
And must have >0 health to act...
Would like to avoid this kind of hard-coded dimension-favoritism.
*/

// need adjectives describing pose and extent
// need adjectives describing change in pose and extent
// need verbs describing action changing pose and extent

var EastWestDescription = {
  adjacent: true,
  relative: true,
  // so if this is relative, are these now differences?
  // west is 0, east is 1,
  // so positive will be easterly, negative westerly
  // so do need conditionals after all?
  // or could just not have relative dimensions
  descriptors: {},
};

var HealthDescription = {
  adjacent: false,
  relative: false,
  // should these be intervals too?
  descriptors: {
    0:    "dead",
    0.1:  "ghoulish",
    0.25: "grim",
    0.5:  "haggard",
    0.75: "healthy",
    1:    "vibrant",
  },
}

var itree = new IntervalTree(0.5);

itree.add(0.1, 0.3,  'foo');
itree.add(0.2, 0.6, 'bar');
itree.add(0, 1);

var intervals = itree.search(0.5);

intervals.forEach(function(interval) {
  console.log(interval.start);
  console.log(interval.end);
  console.log(interval.id);
});

// test out new get-by-id functionality
console.log("shouldn't exist:", itree.get('boo'));
var interval = itree.get('foo');
console.log(interval.start);
console.log(interval.end);
console.log(interval.id);
