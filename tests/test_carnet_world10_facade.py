"""DIGIY CARNET · traduction de la façade WO/ZH, sans changer l'espace PRO."""
import json
import re
import subprocess
import unittest
from pathlib import Path

ROOT=Path(__file__).resolve().parents[1]
ENTRY=(ROOT/"index.html").read_text(encoding="utf-8")
DICTS=(ROOT/"world8-dict.js").read_text(encoding="utf-8")
BRIDGE=(ROOT/"world10-bridge.js").read_text(encoding="utf-8")
NATIVE=(ROOT/"index-native-world8-source.html").read_text(encoding="utf-8")


class CarnetFacadeWorldTen(unittest.TestCase):
    def test_loader_keeps_wo_and_zh(self):
        self.assertEqual(ENTRY.count("fr|en|es|pt|de|it|nl|ar|wo|zh"),2)
        self.assertIn("world10-bridge.js",ENTRY)
        self.assertIn("world8-link-fix.js",ENTRY)
        self.assertIn("index-native-world8-source.html",ENTRY)
        self.assertIn("DIGIY_CARNET_ENTRY_LANG",ENTRY)
        self.assertIn("world10-switch-v2",ENTRY)
        self.assertIn("data-world8-lang=\"wo\"",NATIVE)
        self.assertIn("data-world8-lang=\"zh\"",NATIVE)

    def test_two_complete_new_dictionaries(self):
        prefix="window.DIGIY_WORLD8_PAGE="
        self.assertIn(prefix,DICTS)
        raw=DICTS.split(prefix,1)[1].rsplit(";",1)[0]
        d=json.loads(raw)
        self.assertEqual(set(d),set(("en","es","pt","de","it","nl","ar","wo","zh")))
        for lang in ("wo","zh"):
            self.assertEqual(set(d[lang]),set(d["en"]))
            self.assertEqual(len(d[lang]),26)
            self.assertTrue(all(d[lang].values()))
        self.assertIn("Activation CARNET PRO",DICTS)
        self.assertIn("0 % commission",DICTS)

    def test_bridge_is_local_and_does_not_change_owner(self):
        self.assertIn("ensureControls();",BRIDGE)
        self.assertIn("if(!lang)return;",BRIDGE)
        self.assertIn("u.searchParams.set('lang',code);",BRIDGE)
        self.assertIn("bar.querySelector",BRIDGE)
        self.assertIn("document.documentElement.lang",BRIDGE)
        self.assertIn("window.DIGIY_WORLD8_PAGE",BRIDGE)
        self.assertIn("updateLinks(document)",BRIDGE)
        self.assertNotIn("supabase",BRIDGE.lower())
        self.assertNotIn("fetch(",BRIDGE)
        self.assertNotIn("pay-proof",BRIDGE)
        result=subprocess.run(["node","--check","-"],input=BRIDGE,text=True,capture_output=True)
        self.assertEqual(result.returncode,0,result.stderr)

if __name__=="__main__":
    unittest.main()
