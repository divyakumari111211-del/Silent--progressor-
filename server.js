
const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
app.use(express.json({ limit: "1mb" }));

// Support frontend files in root OR public folder
const publicFolder = path.join(__dirname, "public");
const frontendFolder = fs.existsSync(
  path.join(publicFolder, "index.html")
)
  ? publicFolder
  : __dirname;

app.use(express.static(frontendFolder));

// Free rule-based demo chatbot
function demoReply(message) {
  const text = String(message || "").toLowerCase().trim();

  if (!text) {
    return "Bhai, apna question likho!";
  }

  if (/^(hi|hello|hey|hii)\b/.test(text)) {
    return "Hello bhai! 👋 Main SILENT PROGRESSOR hoon. Study, coding, fitness plans aur prompts mein help maang sakte ho.";
  }

  if (/math|mathematics|गणित|algebra|equation/.test(text)) {
    return "📘 Maths Help\n\n1. Question ko dhyan se padho.\n2. Given values likho.\n3. Sahi formula chuno.\n4. Step-by-step solve karo.\n\nApna exact maths question bhejo. Demo mode mein main har question solve kar paane ki guarantee nahi de sakta.";
  }

  if (/science|physics|chemistry|biology|विज्ञान/.test(text)) {
    return "🔬 Science Help\n\nTopic ko simple language mein samjho:\n• Definition\n• Important points\n• Example\n• Practice questions\n\nApni class aur chapter ka naam likho.";
  }

  if (/sst|history|geography|civics|economics|social science/.test(text)) {
    return "🌍 SST Help\n\nMain tumhe chapter notes, key terms, short-answer formats aur revision checklists ke demo templates de sakta hoon. Apni class aur chapter ka naam batao.";
  }

  if (/study|exam|homework|revision|padhai|पढ़ाई/.test(text)) {
    return "📚 Study Plan\n\n1. Ek topic select karo.\n2. 25 minutes padhai karo.\n3. 5 minutes break lo.\n4. Book band karke recall karo.\n5. 5 questions practice karo.\n\nClass, subjects aur exam date likho—main ek basic plan suggest karunga.";
  }

  if (/code|coding|javascript|html|css|python|website|program/.test(text)) {
    return "💻 Coding Help\n\nWebsite ke liye:\n• HTML = structure\n• CSS = design\n• JavaScript = interaction\n• Node.js = server\n\nExample HTML:\n<!DOCTYPE html>\n<html>\n<head><title>My Website</title></head>\n<body>\n  <h1>Hello World!</h1>\n  <button onclick=\"alert('Hello!')\">Click me</button>\n</body>\n</html>\n\nNote: demo chatbot complex coding problems ko khud se reliably solve nahi kar sakta.";
  }

  if (/image|picture|photo|drawing|generate.*prompt|image prompt/.test(text)) {
    return "🎨 Image Prompt Template\n\n\"Create a high-quality image of [SUBJECT], in [ART STYLE], with [BACKGROUND], [LIGHTING], detailed composition, and [ASPECT RATIO].\"\n\nExample: A cute elephant making roti beside a traditional village chulha, warm evening light, colourful 3D animation, vertical 9:16 composition.\n\nYe prompt banata hai; ye code khud image generate nahi karta.";
  }

  if (/fitness|workout|exercise|handstand|push.?up/.test(text)) {
    return "💪 Fitness Demo\n\nBeginner routine:\n• Warm-up: 5 minutes\n• Push-ups: 2–3 comfortable sets\n• Squats: 2–3 sets\n• Plank: 2 comfortable holds\n• Cool-down: 5 minutes\n\nCorrect form rakho, rest lo aur pain hone par stop karo. Apne level ke hisaab se routine adjust karo.";
  }

  if (/prompt/.test(text)) {
    return "✍️ Prompt Template\n\nYou are an expert in [TOPIC]. Help me with [TASK]. My level is [BEGINNER/INTERMEDIATE]. Explain in simple Hinglish, step by step, with examples. End with a short checklist.\n\n[TOPIC] aur [TASK] ko apni requirement se replace karo.";
  }

  if (/help|features|kya kar/.test(text)) {
    return "🤖 SILENT PROGRESSOR Demo Features\n\n• Study templates\n• Basic maths/science guidance\n• Coding examples\n• Image prompt templates\n• Fitness routine ideas\n• Basic study planning\n\nYe rule-based demo hai, real AI model nahi. Isliye answers predefined rules par depend karte hain.";
  }

  return "Bhai, main SILENT PROGRESSOR ka free rule-based demo hoon. 😊\n\nTry karo:\n• Maths help\n• Science notes\n• Coding example\n• Image prompt\n• Study plan\n\nMain har naye ya difficult question ka accurate answer generate nahi kar sakta, kyunki is version mein real AI model nahi hai.";
}

// Chat endpoint
app.post("/api/chat", (req, res) => {
  try {
    const message = String(req.body?.message || "").slice(0, 12000);

    if (!message.trim()) {
      return res.status(400).json({
        error: "Please enter a message."
      });
    }

    return res.json({
      answer: demoReply(message),
      mode: "free-demo"
    });
  } catch (error) {
    console.error("Chat error:", error);
    return res.status(500).json({
      error: "Something went wrong. Please try again."
    });
  }
});

// Serve the website
app.get("*", (req, res) => {
  res.sendFile(path.join(frontendFolder, "index.html"));
});

const port = Number(process.env.PORT || 3000);

app.listen(port, "0.0.0.0", () => {
  console.log(`SILENT PROGRESSOR running on port ${port}`);
});
