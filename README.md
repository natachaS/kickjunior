# kickjunior [![Build Status](https://travis-ci.org/natachaS/kickjunior.svg?branch=master)](https://travis-ci.org/natachaS/kickjunior)
A REPL version of Kickstarter built with the latest version of Node.js v5.4.1 (works with stable versions of Node v0.12 or newer).
The application was built following specified requirements and is using an in-memory data store.


Installation
------------
    $ git clone https://github.com/natachaS/kickjunior.git
    $ cd kickjunior/
    $ npm install
    $ node kickjunior.js

If you would like to run a suite of unit and integration tests you can run :

    $ npm test


How does it work ?
------------------

Commands implemented:

    $ project <project_name> <target_amount> : Starts a new project with a target amount

    $ back <given_name> <project_name> <credit_card> <backing_amount> : Makes a pledge for a project with a valid credit card number

    $ backer <given_name> : Lists the projects backed by a specific user

    $ list <project_name> : Lists all backers for a specific project



Architectural thoughts
------------------

I really enjoyed working on this project!
I chose Node.js because i had never built a REPL using Node before (but built a few using Ruby during my time at Flatiron).
I initially used a module called Vorpal but quickly realized it had its limitations, for example it was not checking the total number of arguments. So I rebuilt the project without it.
The in-memory data store has no data persistence. I could consider seeding the datastore with a JSON file and write data to the file to add data persistence.

I hashed credit cards before storing them as basic security measure. I am also using unique identifier (using the node module node-uuid) in the datastore so there is no redundancy of data entry.

I also built a map of card hashes to username to optimize the search of different users using the same card (rather that iterating through the pledges object).
```
  cards: {
    '2893u23h23092830923adfadfa092': 'arya',
    '49834938498394839483984938493493': 'tywin'
  };
```
