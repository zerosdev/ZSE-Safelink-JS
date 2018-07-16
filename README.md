# Zeros Safelink Engine (ZSE)
JavaScript safelink engine to convert all outgoing page links into safelink URL automatically

This library provide easy way to convert all of your page links into your Safelink URL. For example :

<pre><code>&#x3C;a href=&#x22;https://youroutgoinglink.com&#x22;&#x3E;Your Outgoing Link&#x3C;/a&#x3E;</code></pre>

will be converted to :

<pre><code>&#x3C;a href=&#x22;https://yoursafelink.com/out?go=aHR0cHM6Ly95b3Vyb3V0Z29pbmdsaW5rLmNvbQ==&#x22;&#x3E;Your Outgoing Link&#x3C;/a&#x3E;</code></pre>

This library also has cookie management, so you can decide to keep your visitors always directed to your safelink page or not.

This is proof of how easy this library is :

1. You need to include the main library into your bottom of every page you want to enable safelink (above of &lt;/body&gt; tag)
<pre><code>&#x3C;script src=&#x22;ZSE.min.js&#x22;&#x3E;&#x3C;/script&#x3E;</code></pre>

2. Start for setting up your safelink

<pre><code>&#x3C;script&#x3E;

ZSE.safelink(&#x22;http://your-safelink.com/go?url=&#x22;)

// add some urls that should NOT be converted
.except(['zeros.co.id'])

// or add some urls that should be converted
.only(['facebook.com'])

// set for the cookie lifetime in minute, put 0 to disable cookie (all links will always be converted)
.cookie(0)

// run engine
.run();

&#x3C;/script&#x3E;
</code></pre>

# Available Options

<b>.safelink()</b>

Define your safelink URL. This option must have value. if not, error will be thrown for example :
<pre><code>.safelink('https://your-safelink.com/go?url=')</code></pre>

<b>.except()</b>

Add some domains that SHOULD NOT be converted. This option should have an array value for example :
<pre><code>.except(['facebook.com','youtube.com','zeros.co.id'])</code></pre>

<b>.only()</b>

Add some domains that SHOULD BE converted. This option should have an array value for example :
<pre><code>.only(['twitter.com','github.com'])</code></pre>

<b>.cookie()</b>

Enable / disable cookie lifetime for safelink (in minute). 0 = disable = all links will always be converted. Default value is <b>5</b> minute for example:
<pre><code>.cookie(15)</code></pre>

<b>.linkCount()</b>

Get link count form current page. This option will return integer value

<b>.run()</b>

Run / execute engine


# Note

1. If there is an error, this engine will not be executed and error message will appear in your browser's console.
2. This code is open for public development
3. This code is distributed under MIT License, you can redistribute this code WITHOUT removing or changing creator's credit


# Change Logs

v1.0 [15-07-2018]
- Initial release
