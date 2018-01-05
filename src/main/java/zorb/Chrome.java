package zorb;

import java.util.List;
import java.util.function.Function;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedCondition;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeDriverService;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.remote.RemoteWebDriver;

public class Chrome
{
    static {
	System.setProperty("webdriver.chrome.driver",
			   "c:\\webdrivers\\chromedriver.exe");
    }

    private WebDriver driver = null;

    public void start(String... args) {
	ChromeOptions opts = new ChromeOptions();
	for (String arg : args) {
	    if ( arg.equalsIgnoreCase("headless") )
		opts.addArguments("--headless");
	}
	driver = new ChromeDriver(opts);
    }
    public void quit() { if ( driver != null ) driver.quit(); driver = null; }
    public void go(String url) { driver.get(url); }
    public List<WebElement> css(WebElement ctx,String css) {
	return ctx.findElements(By.cssSelector(css));
    }
    public List<WebElement> css(String css) {
	return driver.findElements(By.cssSelector(css));
    }
    public List<WebElement> xpath(WebElement ctx,String xpath) {
	return ctx.findElements(By.xpath(xpath));
    }
    public List<WebElement> xpath(String xpath) {
	return driver.findElements(By.xpath(xpath));
    }
    public void send(WebElement ctx,String text) {
	ctx.sendKeys(text);
    }
    public <V> void wait(Function<? super WebDriver,V> func,int secs) {
	new WebDriverWait(driver, secs).until(func);
    }
}
