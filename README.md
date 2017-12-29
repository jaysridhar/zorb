# Zorb - Scripting interface to Selenium-Java

A program which allows you to write javascript code to drive the Chrome Browser using Selenium. Main purpose of the program is to ease development of scripts that allow you to automate usage of websites.

## Building

The program is built using Maven. Build it as follows:

```shell
mvn clean package
```

## Running

You should have a `zorb-<version>-jar-with-dependencies.jar` in the `target` directory. You can run it as follows to launch a REPL shell (Read-Eval-Print-Loop):

```shell
java -cp target/zorb-0.1.0-SNAPSHOT-jar-with-dependencies.jar zorb.app
```

Example scripts are located in `examples`. Take a look and use as a guide to develop your own. To run a script, say to check gmail, run the script `gmail.js` as follows. The password is for logging into your mail account:

```shell
... zorb.app gmail.js emailAddr password
```

## Feedback

Always looking for feedback, ideas for writing scripts, contributions, etc. You are welcome.
