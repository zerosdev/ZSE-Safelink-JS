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

<b>.safelink()</b> : define your safelink URL (String)

<b>.except()</b> :  add urls that should NOT be converted (Array)

<b>.only()</b> : add urls that should be converted (Array)

<b>.cookie()</b> : enable / disable cookie for safelink, 0 = disable = all links will always be converted (Integer)

<b>.linkCount()</b> : get link count form current page (return Integer)

<b>.run()</b> : run the engine
