import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const ALCAN_SYSTEM_PROMPT = `You are a local news writer for Alcan News, serving the Alaska Highway corridor including Tok, Delta Junction, Fairbanks, Glennallen, and communities along the historic Alcan Highway. 

Write in a fun, encouraging, adventurous, safety-first style. Be warm and community-focused. Include practical advice, local context, and references to specific highway corridor locations.

Topics to cover:
- Alaska Highway road conditions and maintenance
- Interior Alaska weather and extreme cold advisories
- Trans-Alaska Pipeline and energy news
- Delta Junction bison herd and wildlife updates
- Tok as the "Gateway to Alaska"
- Aurora borealis viewing conditions
- Dog mushing and winter sports
- Ice fishing and outdoor recreation
- Local business spotlights
- Community events and festivals
- Historical Alcan Highway stories
- Gold mining and mineral resources
- Hot springs and tourism
- Emergency services and safety tips`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const supabase = createClient(SUPABASE_URL!, SUPABASE_SERVICE_ROLE_KEY!);

    console.log("Starting Alcan News content generation...");

    // Generate news articles
    const newsPrompt = `Generate 3 unique, engaging local news articles for the Alaska Highway corridor region. Each article should be about different topics relevant to Interior Alaska communities.

Return a JSON array with exactly 3 articles in this format:
[
  {
    "title": "Compelling headline under 80 characters",
    "excerpt": "2-3 sentence summary, 50-100 words",
    "content": "Full article body, 150-250 words",
    "category": "One of: Local, Weather, Wildlife, Transportation, Community, Sports, Economy, History, Tourism"
  }
]

Focus on current winter season topics like road conditions, extreme cold, aurora viewing, ice fishing, dog mushing, and community events. Make it feel authentically Alaskan.`;

    const newsResponse = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: ALCAN_SYSTEM_PROMPT },
          { role: "user", content: newsPrompt }
        ],
        temperature: 0.8,
      }),
    });

    if (!newsResponse.ok) {
      const errorText = await newsResponse.text();
      console.error("AI news generation error:", newsResponse.status, errorText);
      throw new Error(`AI gateway error: ${newsResponse.status}`);
    }

    const newsData = await newsResponse.json();
    const newsContent = newsData.choices?.[0]?.message?.content || "";
    
    console.log("Raw news response:", newsContent);

    // Parse news articles
    let articles = [];
    try {
      const jsonMatch = newsContent.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        articles = JSON.parse(jsonMatch[0]);
      }
    } catch (e) {
      console.error("Failed to parse news articles:", e);
    }

    // Insert news articles
    if (articles.length > 0) {
      const { error: newsError } = await supabase
        .from("news_articles")
        .insert(articles.map((article: any) => ({
          title: article.title,
          excerpt: article.excerpt,
          content: article.content,
          category: article.category || 'Local',
          featured: false,
          published_at: new Date().toISOString()
        })));

      if (newsError) {
        console.error("Error inserting news:", newsError);
      } else {
        console.log(`Inserted ${articles.length} news articles`);
      }
    }

    // Generate alerts
    const alertPrompt = `Generate 2 current alerts for the Alaska Highway corridor. Focus on road conditions, weather advisories, or community safety notices.

Return a JSON array with exactly 2 alerts:
[
  {
    "message": "Alert message under 150 characters",
    "severity": "info" or "warning" or "critical"
  }
]

Make them realistic for Interior Alaska winter conditions.`;

    const alertResponse = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: ALCAN_SYSTEM_PROMPT },
          { role: "user", content: alertPrompt }
        ],
        temperature: 0.7,
      }),
    });

    if (alertResponse.ok) {
      const alertData = await alertResponse.json();
      const alertContent = alertData.choices?.[0]?.message?.content || "";
      
      let alerts = [];
      try {
        const jsonMatch = alertContent.match(/\[[\s\S]*\]/);
        if (jsonMatch) {
          alerts = JSON.parse(jsonMatch[0]);
        }
      } catch (e) {
        console.error("Failed to parse alerts:", e);
      }

      if (alerts.length > 0) {
        // Deactivate old alerts
        await supabase
          .from("alerts")
          .update({ active: false })
          .eq("active", true);

        const { error: alertError } = await supabase
          .from("alerts")
          .insert(alerts.map((alert: any) => ({
            message: alert.message,
            severity: alert.severity || 'info',
            active: true,
            expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
          })));

        if (alertError) {
          console.error("Error inserting alerts:", alertError);
        } else {
          console.log(`Inserted ${alerts.length} alerts`);
        }
      }
    }

    // Generate ticker messages
    const tickerPrompt = `Generate 4 quick info ticker messages for the Alaska Highway corridor. Include road updates, events, fishing reports, or community news.

Return a JSON array with exactly 4 ticker items:
[
  {
    "label": "ROAD" or "WEATHER" or "EVENTS" or "COMMUNITY" or "TRAVEL",
    "message": "Brief message under 100 characters"
  }
]`;

    const tickerResponse = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: ALCAN_SYSTEM_PROMPT },
          { role: "user", content: tickerPrompt }
        ],
        temperature: 0.7,
      }),
    });

    if (tickerResponse.ok) {
      const tickerData = await tickerResponse.json();
      const tickerContent = tickerData.choices?.[0]?.message?.content || "";
      
      let tickers = [];
      try {
        const jsonMatch = tickerContent.match(/\[[\s\S]*\]/);
        if (jsonMatch) {
          tickers = JSON.parse(jsonMatch[0]);
        }
      } catch (e) {
        console.error("Failed to parse tickers:", e);
      }

      if (tickers.length > 0) {
        // Deactivate old tickers
        await supabase
          .from("ticker_messages")
          .update({ active: false })
          .eq("active", true);

        const { error: tickerError } = await supabase
          .from("ticker_messages")
          .insert(tickers.map((ticker: any) => ({
            label: ticker.label || 'INFO',
            message: ticker.message,
            active: true
          })));

        if (tickerError) {
          console.error("Error inserting tickers:", tickerError);
        } else {
          console.log(`Inserted ${tickers.length} ticker messages`);
        }
      }
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Content updated successfully",
        articlesGenerated: articles.length
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error) {
    console.error("Update content error:", error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : "Unknown error" 
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    );
  }
});
