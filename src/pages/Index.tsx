import { useState, useEffect } from "react";
import {
  Cloud,
  Sun,
  Snowflake,
  Wind,
  Droplets,
  Thermometer,
  MapPin,
  Clock,
  ChevronRight,
  ExternalLink,
  Quote,
  Newspaper,
  Phone,
  Mail,
  Mountain,
  AlertTriangle,
  Car,
  Fuel,
  Building2,
  Users,
  TreePine,
  Compass,
  Shield,
  Star,
} from "lucide-react";

const breakingHeadlines = [
  "Alaska Highway winter road conditions advisory: Black ice reported between Tok and Delta Junction",
  "Historic gold nugget discovered near Chicken, Alaska weighing 4.2 ounces",
  "Tok Gateway to Alaska visitor center renovation complete",
  "Northern Lights forecast: Strong aurora activity expected this week",
];

const articles = [
  { title: "Alaska Highway Paving Project Adds 50 Miles of New Surface Between Tok and Border", category: "Infrastructure", color: "slate", excerpt: "The Alaska Department of Transportation has completed a major paving initiative along the Alaska Highway, resurfacing 50 miles of roadway between Tok and the Canadian border crossing at Port Alcan.", time: "2 hours ago", img: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600&h=400&fit=crop" },
  { title: "Gold Mining Claims Near Chicken See Renewed Activity as Prices Surge", category: "Mining", color: "amber", excerpt: "With gold prices hitting record highs, placer mining operations in the Fortymile Mining District near Chicken have seen a dramatic increase in claim staking and seasonal operations.", time: "4 hours ago", img: "https://images.unsplash.com/photo-1605792657660-596af9009e82?w=600&h=400&fit=crop" },
  { title: "Delta Junction Bison Herd Management Plan Draws Public Comment", category: "Wildlife", color: "green", excerpt: "The Alaska Department of Fish and Game is seeking public input on a revised management plan for the Delta bison herd, which has grown to approximately 500 animals.", time: "5 hours ago", img: "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=600&h=400&fit=crop" },
  { title: "Tok Emergency Services Receives New Cold-Weather Rescue Equipment", category: "Public Safety", color: "red", excerpt: "The Tok Volunteer Fire Department and EMS have received a $350,000 grant for specialized cold-weather rescue equipment, including heated patient transport units and arctic survival gear.", time: "6 hours ago", img: "https://images.unsplash.com/photo-1582560475093-ba66accbc424?w=600&h=400&fit=crop" },
  { title: "Trans-Alaska Pipeline Pump Station 10 Undergoes Major Retrofit", category: "Energy", color: "orange", excerpt: "Alyeska Pipeline Service Company has begun a multi-million dollar retrofit of Pump Station 10 near Delta Junction, upgrading critical infrastructure along the 800-mile pipeline corridor.", time: "8 hours ago", img: "https://images.unsplash.com/photo-1513828583688-c52646db42da?w=600&h=400&fit=crop" },
  { title: "Northern Lights Tourism Booms in Interior Alaska Communities", category: "Tourism", color: "cyan", excerpt: "Interior Alaska communities along the Alaska Highway are experiencing a surge in winter tourism, driven by growing international interest in aurora borealis viewing.", time: "10 hours ago", img: "https://images.unsplash.com/photo-1483347756197-71ef80e95f73?w=600&h=400&fit=crop" },
  { title: "Fortymile Country Caribou Herd Migration Tracked by New Satellite Collars", category: "Science", color: "purple", excerpt: "Researchers from the University of Alaska Fairbanks have deployed 40 new satellite-enabled GPS collars on caribou in the Fortymile herd to study migration patterns and habitat use.", time: "12 hours ago", img: "https://images.unsplash.com/photo-1517022812141-23620dba5c23?w=600&h=400&fit=crop" },
  { title: "Interior Alaska Wildfire Season Preparations Begin Early This Year", category: "Environment", color: "emerald", excerpt: "Fire management agencies are ramping up preparations for the upcoming wildfire season across Interior Alaska, with forecasters predicting drier-than-normal conditions this summer.", time: "14 hours ago", img: "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?w=600&h=400&fit=crop" },
];

const categoryColors: Record<string, string> = {
  slate: "bg-slate-600 text-slate-100",
  amber: "bg-amber-600 text-amber-100",
  green: "bg-green-600 text-green-100",
  red: "bg-red-600 text-red-100",
  orange: "bg-orange-600 text-orange-100",
  cyan: "bg-cyan-600 text-cyan-100",
  purple: "bg-purple-600 text-purple-100",
  emerald: "bg-emerald-600 text-emerald-100",
};

const quotes = [
  { text: "Alaska is what happens when Willy Wonka designs a state.", author: "Robin Williams" },
  { text: "In Alaska, you measure distance in time, not miles.", author: "Local saying" },
  { text: "To the lover of wilderness, Alaska is one of the most wonderful countries in the world.", author: "John Muir" },
  { text: "I went to Alaska and I fell in love with the state.", author: "Jewel" },
  { text: "The Northern Lights are proof that even the sky can dance.", author: "Local saying" },
];

const forecast = [
  { day: "Mon", high: 30, low: 12, icon: "snow" },
  { day: "Tue", high: 25, low: 5, icon: "cloud" },
  { day: "Wed", high: 18, low: -5, icon: "snow" },
  { day: "Thu", high: 22, low: 2, icon: "sun" },
  { day: "Fri", high: 28, low: 10, icon: "cloud" },
  { day: "Sat", high: 35, low: 18, icon: "sun" },
  { day: "Sun", high: 32, low: 15, icon: "snow" },
];

const roadConditions = [
  { name: "Alaska Highway (AK-2)", status: "Caution", statusColor: "text-amber-400 bg-amber-400/10 border-amber-400/30", time: "Tok to Border: ~3.5 hrs", hazard: "Black ice patches, reduced visibility in snow zones" },
  { name: "Richardson Highway (AK-4)", status: "Open", statusColor: "text-green-400 bg-green-400/10 border-green-400/30", time: "Delta Jct to Fairbanks: ~2 hrs", hazard: "Frost heaves between mileposts 250–275" },
  { name: "Tok Cutoff (AK-1)", status: "Caution", statusColor: "text-amber-400 bg-amber-400/10 border-amber-400/30", time: "Tok to Glennallen: ~2.5 hrs", hazard: "Drifting snow, plowing in progress" },
  { name: "Taylor Highway (AK-5)", status: "Closed", statusColor: "text-red-400 bg-red-400/10 border-red-400/30", time: "Seasonal closure", hazard: "Closed for winter — reopens mid-April" },
];

const adCards = [
  { name: "Kenai Peninsula Realty", desc: "Waterfront properties on the Kenai Peninsula", url: "#" },
  { name: "Alaska Gold News", desc: "Latest gold prices and mining updates", url: "#" },
  { name: "Tongass Timber Co.", desc: "Sustainable timber from Southeast Alaska", url: "#" },
  { name: "Fairbanks Equipment Rental", desc: "Heavy equipment for mining & construction", url: "#" },
  { name: "Alcan Fuel Services", desc: "Highway fuel stops from Tok to the border", url: "#" },
  { name: "Interior Alaska Realty", desc: "Cabins, land, and homes in the Interior", url: "#" },
  { name: "Chicken Gold Camp", desc: "Historic mining tours and RV park", url: "#" },
  { name: "Delta Meats & Provisions", desc: "Farm-raised bison and local goods", url: "#" },
];

const sisterSites = [
  { name: "Kenai News", url: "#" },
  { name: "Tongass News", url: "#" },
  { name: "Chugach News", url: "#" },
  { name: "Alaska News Corporation", url: "#" },
];

const ForecastIcon = ({ type }: { type: string }) => {
  if (type === "snow") return <Snowflake className="w-6 h-6 text-blue-300" />;
  if (type === "sun") return <Sun className="w-6 h-6 text-amber-400" />;
  return <Cloud className="w-6 h-6 text-slate-400" />;
};

const Index = () => {
  const [tickerOffset, setTickerOffset] = useState(0);
  const [quoteIndex, setQuoteIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setTickerOffset((p) => p - 1), 30);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const id = setInterval(() => setQuoteIndex((p) => (p + 1) % quotes.length), 8000);
    return () => clearInterval(id);
  }, []);

  const tickerText = breakingHeadlines.join("  \u00A0\u00A0\u2022\u00A0\u00A0  ");

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* ===== HEADER / NAV ===== */}
      <header className="border-b border-amber-900/40 bg-slate-950/95 sticky top-0 z-50 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Compass className="w-8 h-8 text-amber-500" />
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-amber-400">ALCAN News</h1>
              <p className="text-xs text-slate-400">Alaska Highway &amp; Interior Corridor</p>
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm text-slate-300">
            {["Highway", "Communities", "Mining", "Wildlife", "Weather", "Tourism"].map((item) => (
              <a key={item} href="#" className="hover:text-amber-400 transition-colors">{item}</a>
            ))}
          </nav>
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <MapPin className="w-3.5 h-3.5" />
            <span>Tok, Alaska</span>
          </div>
        </div>
      </header>

      {/* ===== 1. BREAKING NEWS TICKER ===== */}
      <div className="bg-slate-900 border-b border-amber-900/30 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 flex items-center h-10">
          <span className="shrink-0 bg-amber-500 text-black text-xs font-bold px-2.5 py-0.5 rounded mr-4 animate-pulse">BREAKING</span>
          <div className="overflow-hidden relative flex-1">
            <div className="whitespace-nowrap text-sm text-slate-300" style={{ transform: `translateX(${tickerOffset}px)` }}>
              {tickerText + "  \u00A0\u00A0\u2022\u00A0\u00A0  " + tickerText}
            </div>
          </div>
        </div>
      </div>

      {/* ===== 2. HERO SECTION ===== */}
      <section className="bg-gradient-to-r from-amber-950 via-slate-950 to-orange-950 border-b border-amber-900/30">
        <div className="max-w-7xl mx-auto px-4 py-16 md:py-24">
          <div className="max-w-4xl">
            <span className="inline-block bg-amber-500/20 text-amber-400 text-xs font-semibold px-3 py-1 rounded-full border border-amber-500/30 mb-6">LEAD STORY</span>
            <h2 className="text-3xl md:text-5xl font-bold leading-tight mb-6 text-white">
              Alaska Highway Infrastructure Modernization Project Secures $280M Federal Investment for Critical Corridor Upgrades
            </h2>
            <p className="text-lg text-slate-300 mb-8 leading-relaxed max-w-3xl">
              The U.S. Department of Transportation has approved a landmark $280 million federal investment to modernize the Alaska Highway corridor between Delta Junction and the Canadian border, including bridge replacements, permafrost-resilient road surfaces, and enhanced communications infrastructure for remote communities along the 300-mile route.
            </p>
            <div className="flex flex-wrap items-center gap-6 text-sm text-slate-400">
              <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> December 15, 2024</span>
              <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4" /> Tok, Alaska</span>
              <span className="flex items-center gap-1.5"><Newspaper className="w-4 h-4" /> Infrastructure</span>
            </div>
            <a href="#" className="inline-flex items-center gap-2 mt-8 px-6 py-3 bg-amber-600 hover:bg-amber-500 text-white rounded-lg font-medium transition-colors text-sm">
              Read Full Story <ChevronRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* ===== 3. WEATHER SECTION ===== */}
      <section className="bg-gradient-to-br from-slate-900 to-amber-950 border-b border-amber-900/30">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
            <Thermometer className="w-6 h-6 text-amber-400" />
            Interior Alaska Weather
          </h3>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Current conditions */}
            <div className="space-y-6">
              <div className="bg-slate-800/60 rounded-2xl p-6 border border-slate-700/50">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-sm text-slate-400 mb-1">Tok, Alaska — Current Conditions</p>
                    <div className="flex items-end gap-3">
                      <span className="text-6xl font-bold text-white">28°F</span>
                      <span className="text-slate-400 text-lg mb-2">-2°C</span>
                    </div>
                    <p className="text-amber-400 font-medium mt-1">Clear &amp; Cold</p>
                  </div>
                  <Sun className="w-16 h-16 text-amber-400 opacity-80" />
                </div>
                <div className="grid grid-cols-3 gap-4 mt-6 pt-4 border-t border-slate-700/50">
                  <div className="flex items-center gap-2 text-sm text-slate-300">
                    <Wind className="w-4 h-4 text-slate-400" />
                    <div><p className="text-slate-500 text-xs">Wind</p>NW 8 mph</div>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-300">
                    <Droplets className="w-4 h-4 text-slate-400" />
                    <div><p className="text-slate-500 text-xs">Humidity</p>45%</div>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-300">
                    <Snowflake className="w-4 h-4 text-blue-300" />
                    <div><p className="text-slate-500 text-xs">Feels Like</p>18°F</div>
                  </div>
                </div>
              </div>
              {/* 7-day forecast */}
              <div className="bg-slate-800/60 rounded-2xl p-6 border border-slate-700/50">
                <p className="text-sm font-semibold text-slate-300 mb-4">7-Day Forecast</p>
                <div className="grid grid-cols-7 gap-2 text-center">
                  {forecast.map((d) => (
                    <div key={d.day} className="flex flex-col items-center gap-1.5">
                      <span className="text-xs text-slate-400 font-medium">{d.day}</span>
                      <ForecastIcon type={d.icon} />
                      <span className="text-sm font-semibold text-white">{d.high}°</span>
                      <span className="text-xs text-slate-500">{d.low}°</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {/* Windy iframe */}
            <div className="bg-slate-800/60 rounded-2xl overflow-hidden border border-slate-700/50 min-h-[380px]">
              <iframe
                title="Windy Weather Map"
                src="https://embed.windy.com/embed.html?type=map&location=coordinates&metricRain=in&metricTemp=°F&metricWind=mph&zoom=7&overlay=temp&product=ecmwf&level=surface&lat=63.84&lon=-145.73"
                className="w-full h-full min-h-[380px]"
                frameBorder="0"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ===== 4. NEWS GRID ===== */}
      <section className="border-b border-amber-900/30">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
            <Newspaper className="w-6 h-6 text-amber-400" />
            Latest News
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {articles.map((a, i) => (
              <article key={i} className="bg-slate-900/80 rounded-xl border border-slate-800 overflow-hidden hover:border-amber-700/50 transition-colors group">
                <div className="relative overflow-hidden h-44">
                  <img src={a.img} alt={a.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                  <span className={`absolute top-3 left-3 text-xs font-semibold px-2.5 py-0.5 rounded ${categoryColors[a.color]}`}>{a.category}</span>
                </div>
                <div className="p-4">
                  <h4 className="font-semibold text-sm leading-snug mb-2 text-white group-hover:text-amber-400 transition-colors line-clamp-3">{a.title}</h4>
                  <p className="text-xs text-slate-400 line-clamp-3 mb-3">{a.excerpt}</p>
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{a.time}</span>
                    <a href="#" className="text-amber-500 hover:text-amber-400 flex items-center gap-1 font-medium">Read <ChevronRight className="w-3 h-3" /></a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 5. ALASKA QUOTES ===== */}
      <section className="bg-gradient-to-r from-amber-950/50 via-slate-950 to-orange-950/50 border-b border-amber-900/30">
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <Quote className="w-10 h-10 text-amber-500/60 mx-auto mb-6" />
          <div className="min-h-[100px] flex flex-col items-center justify-center">
            <p className="text-xl md:text-2xl italic text-slate-200 leading-relaxed mb-4 transition-opacity duration-700">
              &ldquo;{quotes[quoteIndex].text}&rdquo;
            </p>
            <p className="text-amber-400 font-medium text-sm">— {quotes[quoteIndex].author}</p>
          </div>
          <div className="flex justify-center gap-2 mt-6">
            {quotes.map((_, i) => (
              <button
                key={i}
                onClick={() => setQuoteIndex(i)}
                className={`w-2 h-2 rounded-full transition-colors ${i === quoteIndex ? "bg-amber-500" : "bg-slate-600"}`}
                aria-label={`Quote ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ===== 6. ROAD CONDITIONS ===== */}
      <section className="border-b border-amber-900/30">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <h3 className="text-2xl font-bold mb-2 flex items-center gap-3">
            <Car className="w-6 h-6 text-amber-400" />
            Highway Conditions
          </h3>
          <p className="text-sm text-slate-400 mb-8">Updated every 30 minutes — always verify before travel</p>
          <div className="grid sm:grid-cols-2 gap-5">
            {roadConditions.map((r, i) => (
              <div key={i} className="bg-slate-900/80 rounded-xl border border-slate-800 p-5 hover:border-amber-800/40 transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <h4 className="font-semibold text-white text-sm">{r.name}</h4>
                  <span className={`text-xs font-bold px-3 py-1 rounded-full border ${r.statusColor}`}>{r.status}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-400 mb-2">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{r.time}</span>
                </div>
                <div className="flex items-start gap-2 text-xs text-slate-400">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                  <span>{r.hazard}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 flex items-center gap-2 text-sm text-slate-400 bg-slate-900/50 rounded-lg px-4 py-3 border border-slate-800">
            <Shield className="w-4 h-4 text-amber-500" />
            <span>Check <a href="https://511.alaska.gov" target="_blank" rel="noopener noreferrer" className="text-amber-400 underline hover:text-amber-300">511.alaska.gov</a> for real-time updates and road camera feeds.</span>
          </div>
        </div>
      </section>

      {/* ===== 7. AD NETWORK ===== */}
      <section className="bg-slate-900/40 border-b border-amber-900/30">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <h3 className="text-lg font-semibold mb-6 text-slate-400 flex items-center gap-2">
            <Star className="w-4 h-4 text-amber-500" />
            From Our Network
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {adCards.map((ad, i) => (
              <a key={i} href={ad.url} className="bg-slate-800/50 rounded-lg border border-slate-700/50 p-4 hover:border-amber-700/50 hover:bg-slate-800/80 transition-all group block">
                <h4 className="font-semibold text-sm text-white group-hover:text-amber-400 transition-colors mb-1">{ad.name}</h4>
                <p className="text-xs text-slate-400">{ad.desc}</p>
                <span className="inline-flex items-center gap-1 text-xs text-amber-500 mt-3 font-medium">Visit <ExternalLink className="w-3 h-3" /></span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 8. REGIONAL INFO ===== */}
      <section className="border-b border-amber-900/30">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
            <Mountain className="w-6 h-6 text-amber-400" />
            Alaska Interior at a Glance
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-slate-900/80 rounded-xl border border-slate-800 p-5 space-y-3">
              <div className="flex items-center gap-2 text-amber-400 font-semibold text-sm mb-2">
                <Compass className="w-4 h-4" /> Alaska Highway
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">Built in 1942 during WWII, the Alaska Highway stretches 1,387 miles from Dawson Creek, BC to Delta Junction, AK. The Alaska portion covers approximately 300 miles through rugged Interior terrain.</p>
            </div>
            <div className="bg-slate-900/80 rounded-xl border border-slate-800 p-5 space-y-3">
              <div className="flex items-center gap-2 text-amber-400 font-semibold text-sm mb-2">
                <Users className="w-4 h-4" /> Communities
              </div>
              <ul className="text-xs text-slate-400 space-y-1.5">
                <li className="flex justify-between"><span>Tok</span><span className="text-slate-500">pop. ~1,200</span></li>
                <li className="flex justify-between"><span>Delta Junction</span><span className="text-slate-500">pop. ~1,100</span></li>
                <li className="flex justify-between"><span>Chicken</span><span className="text-slate-500">~7 year-round</span></li>
                <li className="flex justify-between"><span>Eagle</span><span className="text-slate-500">pop. ~90</span></li>
              </ul>
            </div>
            <div className="bg-slate-900/80 rounded-xl border border-slate-800 p-5 space-y-3">
              <div className="flex items-center gap-2 text-amber-400 font-semibold text-sm mb-2">
                <Building2 className="w-4 h-4" /> History &amp; Industry
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">Rooted in the Gold Rush era and shaped by WWII highway construction. Key industries today include tourism, mining, government services, and subsistence living.</p>
            </div>
            <div className="bg-slate-900/80 rounded-xl border border-slate-800 p-5 space-y-3">
              <div className="flex items-center gap-2 text-amber-400 font-semibold text-sm mb-2">
                <Thermometer className="w-4 h-4" /> Climate &amp; Extremes
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">Winter temperatures can plunge to -60°F while summer highs can reach 90°F — a 150° swing. The extreme continental climate defines daily life in the Interior.</p>
            </div>
            <div className="bg-slate-900/80 rounded-xl border border-slate-800 p-5 space-y-3">
              <div className="flex items-center gap-2 text-amber-400 font-semibold text-sm mb-2">
                <TreePine className="w-4 h-4" /> Wildlife
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">Home to moose, caribou, wolves, grizzly bears, and bald eagles. The Delta bison herd and Fortymile caribou herd are iconic to the region.</p>
            </div>
            <div className="bg-slate-900/80 rounded-xl border border-slate-800 p-5 space-y-3">
              <div className="flex items-center gap-2 text-amber-400 font-semibold text-sm mb-2">
                <Fuel className="w-4 h-4" /> Key Infrastructure
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">The Trans-Alaska Pipeline passes through the region. Limited services between communities — always fuel up and carry emergency supplies when traveling.</p>
            </div>
            <div className="bg-slate-900/80 rounded-xl border border-slate-800 p-5 space-y-3">
              <div className="flex items-center gap-2 text-amber-400 font-semibold text-sm mb-2">
                <Shield className="w-4 h-4" /> Emergency Services
              </div>
              <ul className="text-xs text-slate-400 space-y-1.5">
                <li>Emergency: <span className="text-white font-medium">911</span></li>
                <li>AK State Troopers Tok: <span className="text-white font-medium">(907) 883-5111</span></li>
                <li className="text-slate-500">Nearest hospital: Fairbanks Memorial (~200 mi from Tok)</li>
              </ul>
            </div>
            <div className="bg-slate-900/80 rounded-xl border border-slate-800 p-5 space-y-3">
              <div className="flex items-center gap-2 text-amber-400 font-semibold text-sm mb-2">
                <MapPin className="w-4 h-4" /> Visitor Info
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">Tok is the official &quot;Gateway to Alaska&quot; — the first major community travelers reach entering Alaska via the Alaska Highway. The Tok Mainstreet Visitor Center offers trip-planning assistance year-round.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 9. FOOTER ===== */}
      <footer className="bg-slate-950 border-t border-amber-900/30">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid md:grid-cols-4 gap-8 mb-10">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <Compass className="w-7 h-7 text-amber-500" />
                <span className="text-xl font-bold text-amber-400">ALCAN News</span>
              </div>
              <p className="text-sm text-slate-400 leading-relaxed max-w-md mb-4">
                Covering the Alaska Highway corridor and Interior communities — from Delta Junction to the Canadian border and everywhere in between.
              </p>
              <p className="text-xs text-slate-500">Part of Alaska News Corporation</p>
            </div>
            <div>
              <h4 className="font-semibold text-sm text-white mb-4">Sister Sites</h4>
              <ul className="space-y-2">
                {sisterSites.map((s) => (
                  <li key={s.name}>
                    <a href={s.url} className="text-sm text-slate-400 hover:text-amber-400 transition-colors flex items-center gap-1.5">
                      <ChevronRight className="w-3 h-3 text-amber-600" /> {s.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-sm text-white mb-4">Contact</h4>
              <ul className="space-y-3 text-sm text-slate-400">
                <li className="flex items-center gap-2"><Mail className="w-4 h-4 text-amber-500" /> news@alcannews.com</li>
                <li className="flex items-center gap-2"><Phone className="w-4 h-4 text-amber-500" /> (907) 555-0400</li>
                <li className="flex items-center gap-2"><MapPin className="w-4 h-4 text-amber-500" /> Tok, Alaska 99780</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            <p>&copy; {new Date().getFullYear()} ALCAN News — Alaska News Corporation. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <a href="#" className="hover:text-amber-400 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-amber-400 transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-amber-400 transition-colors">Advertise</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
