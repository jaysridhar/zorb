/*
 * Author: Jay Sridhar (jay.sridhar@gmail.com)
 * License: See LICENSE for details
 */
package zorb;

import java.io.FileReader;
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.Arrays;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.logging.Logger;
import java.util.function.Function;
import java.net.URL;
import javax.script.ScriptEngineManager;
import javax.script.ScriptEngineFactory;
import javax.script.ScriptEngine;
import javax.script.ScriptContext;
import javax.script.Bindings;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedCondition;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeDriverService;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.remote.RemoteWebDriver;

public class app
{
    static private void jsrepl(String[] args)
	throws java.io.IOException
    {
	ScriptEngineManager mgr = new ScriptEngineManager();
	ScriptEngine engine = mgr.getEngineByName("javascript");
	Bindings bindings = engine.getBindings(ScriptContext.ENGINE_SCOPE);
	bindings.put("argv", args);
	bindings.put("c", new Chrome());

	if ( args.length > 0 ) {
	    String arg = args[0];
	    try { engine.eval(new FileReader(arg)); }
	    catch(Exception ex) {
		System.err.println("Error executing " + arg + ": " +
				   ex.getMessage());
	    }
	}

	BufferedReader in = new BufferedReader(new InputStreamReader(System.in));
	String line = null;
	String prompt = "js >> ";
	for (System.out.print(prompt) ;
	     (line = in.readLine()) != null ; System.out.print(prompt) ) {
	    line = line.trim();
	    if ( line.isEmpty() ) continue;
	    try { engine.eval(line); }
	    catch(Exception ex) {
		System.err.println("Error: " + ex.getMessage());
	    }
	}
    }

    static public void main(String[] args) throws Exception
    {
	if ( args.length > 0 && args[0].equals("-help") ) {
	    System.err.println("Usage: java app [jsFile [args ..]]");
	    System.exit(1);
	}

	jsrepl(args);
    }
}
