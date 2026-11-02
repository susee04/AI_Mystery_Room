const CASES = Object.freeze({
  easy: {
    title: "The Last Light at Bellweather Library",
    story: "During the library's centennial reception, a rare first edition vanishes from a locked display just before the lights fail. The alarm never sounds, and three people had legitimate access to the reading room. A damp crescent on the sill and a changed maintenance note suggest the blackout was planned. The book is insured, but its handwritten dedication makes it far more valuable to one person than its market price. Reconstructing the room's quiet final minutes reveals how the thief used the storm, a borrowed key, and the building's old radiator passage to move the book without crossing the lobby.",
    suspects: [
      { id: "s1", name: "Mara Voss", age: 42, description: "The head librarian who curated the centennial display and knows the building's older service spaces.", relationship: "Head librarian", motive: "She feared the book would be sold after the event and wanted to hide it until the library could secure its collection.", background: "Mara has worked at Bellweather for eighteen years and personally catalogued the book." },
      { id: "s2", name: "Eli Mercer", age: 29, description: "A local bookseller invited to authenticate the first edition before the reception.", relationship: "Visiting rare-book dealer", motive: "A private buyer offered him a large commission if he could deliver the book that night.", background: "Eli arrived with a leather folio and left it at the welcome desk." },
      { id: "s3", name: "Nina Cole", age: 35, description: "The facilities technician responsible for the building's lights and alarm panel.", relationship: "Facilities technician", motive: "She had recently been warned that her job might be cut and needed money for overdue rent.", background: "Nina maintains the original electrical plan and knows the storm sometimes trips the east circuit." },
    ],
    clues: [
      { id: "c1", title: "A Dry Display Case", description: "The case's interior felt dry, while rainwater marked the outer sill. The book was removed before the storm gust reached the window.", importance: "high" },
      { id: "c2", title: "The Rewritten Work Note", description: "The maintenance note says the east lights were to be checked at 8:30, but the ink over the time is still tacky and the original entry reads 8:10.", importance: "high" },
      { id: "c3", title: "Dust on the Radiator Grille", description: "A narrow clean streak crosses the dust behind the radiator. The old service chase leads to the staff alcove, not outside.", importance: "medium" },
      { id: "c4", title: "The Borrowed Key Record", description: "The display key was signed out by Mara for a routine inspection and returned before the lights failed. No other key was issued.", importance: "high" },
      { id: "c5", title: "A Page in the Catalogue", description: "Mara's cataloguing slip describes a loose dedication page. That page was found tucked safely inside the staff alcove, beside the radiator chase.", importance: "medium" },
    ],
    hints: [
      { id: "h1", text: "Separate the moment the book left the case from the later blackout. The damp sill may be a distraction." },
      { id: "h2", text: "Compare who could open the display with who could alter the maintenance note and reach the staff alcove." },
    ],
    evidence: [
      { id: "e1", type: "cctv", title: "Reading Room Camera", description: "Fictional security footage summary", content: "At 8:06 PM, Mara enters the reading room carrying the cataloguing ledger. She leaves empty-handed at 8:13 PM. The east lights do not flicker until 8:29 PM.", timestamp: "8:06–8:29 PM", location: "Reading room" },
      { id: "e2", type: "document", title: "Facilities Log", description: "A copy of the evening maintenance sheet", content: "The original carbon copy lists an east-circuit check at 8:10 PM. The top sheet was changed to 8:30 PM after the event began.", timestamp: "7:45 PM", location: "Facilities desk" },
      { id: "e3", type: "witness", title: "Volunteer Statement", description: "A volunteer recalls the room before the blackout", content: "The volunteer saw Mara return the display key and place a thin object inside her cataloguing ledger shortly before the lights dimmed.", timestamp: "8:18 PM", location: "Front desk" },
      { id: "e4", type: "object", title: "The Dedication Page", description: "A handwritten page recovered from the staff alcove", content: "The page is intact and dry. Its fold matches the loose page noted in the library catalogue, linking the alcove to the missing book.", location: "Staff alcove" },
    ],
    culprit: "s1",
    solution: "Mara Voss removed the book before the blackout, using the display key she had signed out. She hid it in the radiator service chase beside the staff alcove and used the storm and later circuit failure to make the disappearance appear to have happened in darkness. The original maintenance log, early camera timing, and dedication page recovered in the alcove establish both her opportunity and the route. Her motive was to keep the collection from being sold, though taking the book was still theft.",
    supportingEvidence: ["c2", "c4", "e1", "e2", "e4"],
  },
  medium: {
    title: "The Blue Hour at Meridian House",
    story: "At the reopening of Meridian House Museum, the observatory's brass astrolabe disappears during a brief power dip. The display alarm remains armed, and the only exit camera shows no one carrying a large object. Four guests and staff members had plausible reasons to approach the gallery. A tea tray, a conservation wrap, and a timestamp discrepancy point to a theft staged as a routine artifact transfer. The astrolabe is too large to hide in a pocket, so the solution depends on understanding what was moved before the lights dimmed and which museum record was quietly altered.",
    suspects: [
      { id: "s1", name: "Dr. Leena Shah", age: 38, description: "The museum's conservation lead who prepared the astrolabe for the reopening display.", relationship: "Conservation lead", motive: "She believed the museum planned to sell the piece and wanted to conceal it until a public trust could intervene.", background: "Leena wrote the handling plan and had supervised the artifact's transport." },
      { id: "s2", name: "Owen Pike", age: 46, description: "A donor whose family name appears on the museum's largest gallery.", relationship: "Major donor", motive: "He wanted the astrolabe returned to his family and was angry that the museum rejected his ownership claim.", background: "Owen attended the event with a long, narrow umbrella case." },
      { id: "s3", name: "Rafi Bell", age: 31, description: "An event caterer who moved trays through the service corridor all evening.", relationship: "Catering supervisor", motive: "He had debts and knew the gallery would be crowded during the toast.", background: "Rafi's staff had access to the freight lift but not the artifact cabinet." },
      { id: "s4", name: "Tess Ward", age: 27, description: "A gallery attendant who monitored the alarm and guided guests.", relationship: "Gallery attendant", motive: "She hoped to embarrass the museum after being passed over for a permanent position.", background: "Tess signed the evening gallery checklist and stayed near the west doors." },
    ],
    clues: [
      { id: "c1", title: "The Unbroken Alarm Seal", description: "The cabinet seal is intact and the alarm registered no opening during the power dip. The astrolabe was likely removed before the gallery closed.", importance: "high" },
      { id: "c2", title: "Two Weight Readings", description: "The outgoing inventory weight is 1.8 kilograms lower than the signed intake reading, although the object is listed as present on both forms.", importance: "high" },
      { id: "c3", title: "Conservation Wrap Fibers", description: "Blue archival tissue fibers caught under the gallery bench match the museum's conservation wrap, not the caterer's white service cloth.", importance: "medium" },
      { id: "c4", title: "A Changed Lift Slot", description: "The freight-lift booking was moved from 7:20 to 8:20 after the event began. The edit came from a staff terminal in the conservation room.", importance: "high" },
      { id: "c5", title: "The Tea Tray Route", description: "A tray passed the gallery twice, but its camera shadow stayed shallow and narrow; it could not have concealed the astrolabe.", importance: "low" },
      { id: "c6", title: "The Cabinet Checklist", description: "Tess's checklist records the cabinet as sealed at 7:05, but her initials are copied from a line above and the pen pressure is absent.", importance: "medium" },
      { id: "c7", title: "A Crate Label", description: "A discarded label marks an empty conservation crate as containing only packing foam. Its matching crate was booked on the adjusted freight-lift slot.", importance: "high" },
    ],
    hints: [
      { id: "h1", text: "The power dip may be a distraction. Look for signs that the artifact was already missing before the alarm system was affected." },
      { id: "h2", text: "Follow the weight discrepancy and ask which suspect could change a freight booking from the conservation room." },
      { id: "h3", text: "The fibers identify the wrapping, while the lift record identifies the route. Match both to a person's role." },
    ],
    evidence: [
      { id: "e1", type: "document", title: "Object Intake Record", description: "Museum handling record", content: "The astrolabe weighed 6.4 kilograms at intake. A later checklist lists it at 4.6 kilograms while marking the cabinet sealed.", timestamp: "6:40 PM", location: "Conservation room" },
      { id: "e2", type: "cctv", title: "Freight Lift Camera", description: "Fictional camera summary", content: "A sealed conservation crate leaves the lower level at 8:22 PM. Leena accompanies it and presents a transfer slip; no other suspect approaches the lift.", timestamp: "8:22 PM", location: "Freight lift" },
      { id: "e3", type: "message", title: "Event Crew Chat", description: "Fictional staff message", content: "Rafi asks whether the tea tray can wait until after the toast. The event coordinator replies that it never entered the conservation corridor.", timestamp: "7:58 PM", location: "Event staff chat" },
      { id: "e4", type: "witness", title: "Registrar's Recollection", description: "Statement from the museum registrar", content: "The registrar saw Leena wrap a heavy object before the gallery doors opened, saying the display mount needed a final balance check.", timestamp: "6:55 PM", location: "Observatory gallery" },
    ],
    culprit: "s1",
    solution: "Leena Shah removed the astrolabe during the legitimate conservation preparation, before the gallery opened. She concealed it in archival wrap inside a crate recorded as packing material, then changed the freight-lift booking so the crate could leave during the busy reception. The intact alarm seal and lower outgoing weight show that the object was already gone; the conservation fibers, terminal edit, crate label, and lift footage tie the preparation and removal to Leena. Her stated aim was to protect the artifact, but she deliberately falsified records and removed it without authorization.",
    supportingEvidence: ["c1", "c2", "c3", "c4", "c7", "e2", "e4"],
  },
  hard: {
    title: "The Silent Ledger of North Quay",
    story: "A sealed tender ledger disappears from the North Quay archives on the eve of a harbor restoration vote. The records room shows no forced entry, its humidity seal is intact, and five people had reason to influence the vote. A ferry delay, a duplicate seal, and a maintenance sensor that logged the wrong clock time create several convincing timelines. The ledger is valuable because it documents an undisclosed easement that could change who controls the waterfront. Solving the case means reconciling three clocks, distinguishing a copied seal from the original, and identifying who could make a service trolley appear to be in the archive when it was elsewhere.",
    suspects: [
      { id: "s1", name: "Inez Calder", age: 44, description: "The archives registrar who supervised the ledger's sealed transfer and controlled the room's cataloguing records.", relationship: "Archives registrar", motive: "She wanted to prevent a developer from using the ledger's easement clause to displace the quay's small businesses.", background: "Inez had access to seal stock and knew the archive's environmental sensors drifted after maintenance." },
      { id: "s2", name: "Graham Vale", age: 52, description: "A developer bidding to build a marina on the North Quay waterfront.", relationship: "Tender bidder", motive: "The ledger could expose an easement that would make his project far less profitable.", background: "Graham left the public reception before the ferry service slowed." },
      { id: "s3", name: "Sofia Nair", age: 33, description: "A ferry dispatcher whose family has operated a small quay-side repair shop for decades.", relationship: "Ferry dispatcher", motive: "The easement could protect her family's shop, giving her a strong reason to interfere with the vote.", background: "Sofia can see vessel movements but cannot access archive systems." },
      { id: "s4", name: "Cal Rusk", age: 39, description: "A building engineer who serviced the archive's humidity sensor earlier that day.", relationship: "Building engineer", motive: "He had unpaid invoices with the developer and could benefit if the vote favored the marina.", background: "Cal carried a service tablet that can synchronize sensor clocks." },
      { id: "s5", name: "Pavel Orin", age: 61, description: "A retired harbor clerk who helped compile the tender ledger years ago.", relationship: "Retired harbor clerk", motive: "He feared the ledger would reveal that he approved an old boundary change without proper review.", background: "Pavel had no current key but knew the old archive layout." },
    ],
    clues: [
      { id: "c1", title: "The Intact Humidity Seal", description: "The paper seal across the records-room door is unbroken, but the seal's numbered edge is a color photocopy rather than the embossed original.", importance: "high" },
      { id: "c2", title: "Three Clocks, Three Times", description: "The corridor camera is six minutes fast, the archive sensor is eleven minutes slow, and the ferry manifest uses dispatch time. Correcting all three removes Sofia's apparent overlap.", importance: "high" },
      { id: "c3", title: "A Duplicate Seal Number", description: "The photographed seal number matches the registrar's sealed-stock book, but the original stock page shows the seal was issued to Inez for a transfer rehearsal.", importance: "high" },
      { id: "c4", title: "The Trolley's Wheel Mark", description: "A wet wheel mark ends before the archive threshold. The trolley shown on the sensor report was parked in the service bay during that interval.", importance: "medium" },
      { id: "c5", title: "A Rewritten Ferry Manifest", description: "The ferry log was corrected after the slowdown, but its signed radio copy confirms Sofia's vessel remained outside the quay until after the ledger was secured.", importance: "medium" },
      { id: "c6", title: "The Synchronization Request", description: "Cal's tablet requested a sensor time sync at 9:14 PM, but the archive sensor accepted no changes because its network cable had been disconnected.", importance: "medium" },
      { id: "c7", title: "Ledger Weight in the Catalog", description: "A catalog entry written at 8:50 PM records the sealed ledger at its correct weight, although the corridor camera time makes this look later than it was.", importance: "high" },
      { id: "c8", title: "The Carbon Transfer Slip", description: "A carbon copy says the ledger was moved for a rehearsal at 8:42. The carbon impression is genuine and predates the photocopied door seal.", importance: "high" },
      { id: "c9", title: "Ink Under the Staple", description: "The staple on the stock-book page covers the lower half of Inez's initials, showing the entry was written before the page was bound, not added after the disappearance.", importance: "medium" },
    ],
    hints: [
      { id: "h1", text: "Put every timestamp on a single corrected timeline before ruling anyone in or out. One clock is fast and another is slow." },
      { id: "h2", text: "The door was not opened in the normal way. Check whether its seal is genuine and who had the numbered stock." },
      { id: "h3", text: "The ledger's catalog weight and carbon slip establish an earlier movement. Compare those records with the rehearsal and seal issue." },
    ],
    evidence: [
      { id: "e1", type: "document", title: "Sealed-Stock Register", description: "Archive supplies register", content: "Seal 441 was issued to Inez Calder for a transfer rehearsal at 8:35 PM. The matching seal visible on the records-room door is flat and lacks the official embossing.", timestamp: "8:35 PM", location: "Archive office" },
      { id: "e2", type: "cctv", title: "Quay Corridor Camera", description: "Fictional camera summary", content: "At camera time 9:02 PM, a person in registrar's gloves carries a slim document case away from the archive. The camera clock is six minutes fast, placing the event at 8:56 PM.", timestamp: "9:02 PM camera time", location: "North corridor" },
      { id: "e3", type: "message", title: "Engineer Service Notes", description: "Fictional maintenance thread", content: "Cal reports that the humidity sensor cable was disconnected before his sync request. He notes that the sensor's displayed time was still eleven minutes behind the wall clock.", timestamp: "9:14 PM", location: "Facilities channel" },
      { id: "e4", type: "witness", title: "Night Guard Statement", description: "Statement from the overnight guard", content: "The guard saw Inez carry a slim case to the archive office before the public reception. She returned without it and said the transfer rehearsal was complete.", timestamp: "8:48 PM", location: "Archive corridor" },
    ],
    culprit: "s1",
    solution: "Inez Calder took the ledger during a real transfer rehearsal and replaced the door's genuine seal with a photocopy, making the room appear continuously sealed. She used her access to seal stock and catalog records to create a plausible rehearsal trail, then relied on the archive sensor's slow clock and the corridor camera's fast clock to obscure when the ledger moved. The carbon transfer slip and catalog weight place the ledger in motion before the apparent late-night window; the stock register and guard's account identify Inez's access and actions. The other suspicious timelines dissolve when the clocks are corrected, and Cal's sync request could not have changed the disconnected sensor.",
    supportingEvidence: ["c1", "c2", "c3", "c7", "c8", "c9", "e1", "e4"],
  },
});

function createLocalMystery(difficulty) {
  const mystery = CASES[difficulty];
  if (!mystery) throw new Error(`No local mystery is configured for difficulty: ${difficulty}`);
  return structuredClone(mystery);
}

module.exports = { createLocalMystery };
