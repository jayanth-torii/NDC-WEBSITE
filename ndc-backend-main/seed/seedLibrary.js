const mongoose = require("mongoose");

// Seeded from ndc-web-main/src/app/Data/LibraryContent.tsx (the hand-edited
// object actually rendering on the live /library page today), NOT from
// data-export/library/data.json (a stale, never-wired-up CMS snapshot) —
// confirmed as the right source with the user. Shape matches exactly what
// app/library/page.tsx used to compute inline as `libraryData`.
const LIBRARY_DATA = {
  aboutLibrary: {
    title: "ABOUT LIBRARY",
    aboutText: [
      "The department of Library and Information Centre was established in the year 2013. Library has a vast collection of books, reference books, national and international journals, e-books, e-journals, dictionary and other resources. Nagarjuna Degree College Library subscribes journals, magazines and newspapers which include English and Kannada. I-Vidyalaya Resource Management software is used for Library services.",
      "The motto of the Library is to provide services to students, faculties and research scholars of the institution through the development of important collections.",
    ],
    dropdowns: [
      {
        title: "Library Services",
        content: [
          {
            type: "list",
            items: [
              "Reference Service",
              "Current Awareness Service",
              "Circulation",
              "Question Papers Service",
              "Assisting users in accessing e-resources",
              "News paper information dissemination",
            ],
          },
        ],
      },
      {
        title: "Library Collection",
        content: [
          {
            type: "list",
            items: [
              "Total no. of Titles: 2842",
              "Total no. of Volumes: 8598",
              "No. of Journals: 24",
              "No. of Magazines: 08",
              "No. of Newspapers: 11",
            ],
          },
        ],
      },
    ],
  },

  digitalResources: {
    title: "DIGITAL RESOURCES",
    tabs: ["E-BOOKS", "E-JOURNALS", "VIDEO LECTURES", "E-THESES"],
    resoursesTable: {
      "E-BOOKS": [
        { sn: 1, name: "National Digital Library of India", link: "https://ndl.iitkgp.ac.in/" },
        { sn: 2, name: "Directory of Open Access Books (DOAB)", link: "https://www.doabooks.org/" },
        { sn: 3, name: "PDF Drive", link: "https://www.pdfdrive.com/" },
        { sn: 4, name: "Many Books", link: "https://manybooks.net/" },
        { sn: 5, name: "Internet Archive", link: "https://archive.org/" },
        { sn: 6, name: "Open Library", link: "https://openlibrary.org/" },
        { sn: 7, name: "Library Genesis", link: "https://libgen.gs/" },
        { sn: 8, name: "The Universal Library", link: "http://ulib.isri.cmu.edu/" },
        { sn: 9, name: "Rare Book Room", link: "http://www.rarebookroom.org/" },
        { sn: 10, name: "LibriVox", link: "https://librivox.org/" },
        { sn: 11, name: "TradePub", link: "https://www.tradepub.com/" },
        { sn: 12, name: "Open Textbook", link: "https://open.umn.edu/opentextbooks" },
        { sn: 13, name: "arXiv", link: "https://arxiv.org/" },
        { sn: 14, name: "The Free Library", link: "https://www.thefreelibrary.com/" },
        { sn: 15, name: "IPL", link: "https://www.ipl.org/books-and-culture-a-christian-review/" },
        { sn: 16, name: "JustFreeBooks", link: "https://www.justfreebooks.info/" },
        { sn: 17, name: "OAPEN", link: "https://www.oapen.org/home" },
      ],
      "E-JOURNALS": [
        { sn: 1, name: "Taylor & Francis", link: "https://www.tandfonline.com/openaccess/openjournals" },
        { sn: 2, name: "JSTOR", link: "https://about.jstor.org/oa-and-free/open-access-journals/" },
        { sn: 3, name: "Paperity", link: "https://paperity.org/" },
        { sn: 4, name: "OXFORD ACADEMIC", link: "https://academic.oup.com/pages/open-research/open-access?login=false" },
        { sn: 5, name: "ACS Publications", link: "https://acs.figshare.com/search?q=artificial%20intelligence&itemTypes=3" },
        { sn: 6, name: "Omnics Group", link: "https://www.omicsonline.org/about.php" },
        { sn: 7, name: "MDPI", link: "https://www.mdpi.com/" },
        { sn: 8, name: "Microsoft MSROPENDATA", link: "https://www.microsoft.com/en-us/research/tools/" },
        { sn: 9, name: "ERUDIT", link: "https://www.erudit.org/en/journals/" },
        { sn: 10, name: "Cogent OA", link: "https://www.tandfonline.com/openaccess/cogentoa" },
        { sn: 11, name: "DOAJ", link: "https://www.doaj.org/" },
        { sn: 12, name: "Airccse", link: "https://airccse.org/" },
        { sn: 13, name: "OALib Journal", link: "https://www.oalib.com/journal/" },
        { sn: 14, name: "MIT Press Direct", link: "https://direct.mit.edu/coli/search-results?page=1&q=artificial%20intelligence%20&fl_SiteID=1000003" },
        { sn: 15, name: "NIST Science Data Portal", link: "https://data.nist.gov/sdp/#/search?q=artificial%20intelligence%20" },
        { sn: 16, name: "Impact Journals", link: "https://www.impactjournals.us/index.php" },
        { sn: 17, name: "OAIster", link: "https://oaister.on.worldcat.org/discovery" },
        { sn: 18, name: "RePEc", link: "http://repec.org/" },
      ],
      "VIDEO LECTURES": [
        { sn: 1, name: "NPTEL", link: "https://nptel.ac.in/" },
        { sn: 2, name: "MIT OpenCourseWare", link: "https://ocw.mit.edu/" },
        { sn: 3, name: "Khan Academy", link: "https://www.khanacademy.org/" },
        { sn: 4, name: "Coursera (Free Courses)", link: "https://www.coursera.org/courses?query=free" },
        { sn: 5, name: "edX (Free Courses)", link: "https://www.edx.org/" },
        { sn: 6, name: "Udacity (Free Courses)", link: "https://www.udacity.com/courses/all" },
        { sn: 7, name: "Harvard Online Courses", link: "https://online-learning.harvard.edu/" },
        { sn: 8, name: "Stanford Online", link: "https://online.stanford.edu/" },
        { sn: 9, name: "FutureLearn", link: "https://www.futurelearn.com/" },
        { sn: 10, name: "OpenLearn (The Open University)", link: "https://www.open.edu/openlearn/" },
      ],
      "E-THESES": [
        { sn: 1, name: "Shodhganga (Indian Theses Repository)", link: "https://shodhganga.inflibnet.ac.in/" },
        { sn: 2, name: "DART-Europe E-Theses Portal", link: "https://www.dart-europe.org/" },
        { sn: 3, name: "EThOS (British Library Theses Service)", link: "https://ethos.bl.uk/" },
        { sn: 4, name: "NDLTD (Networked Digital Library of Theses and Dissertations)", link: "http://www.ndltd.org/" },
        { sn: 5, name: "Open Access Theses and Dissertations (OATD)", link: "https://oatd.org/" },
        { sn: 6, name: "MIT Theses", link: "https://dspace.mit.edu/handle/1721.1/7582" },
      ],
      DICTIONARIES: [
        { sn: 1, name: "Merriam-Webster", link: "https://www.merriam-webster.com/" },
        { sn: 2, name: "Oxford Learner's Dictionary", link: "https://www.oxfordlearnersdictionaries.com/" },
        { sn: 3, name: "Cambridge Dictionary", link: "https://dictionary.cambridge.org/" },
        { sn: 4, name: "Collins Dictionary", link: "https://www.collinsdictionary.com/" },
        { sn: 5, name: "WordReference", link: "https://www.wordreference.com/" },
        { sn: 6, name: "The Free Dictionary", link: "https://www.thefreedictionary.com/" },
        { sn: 7, name: "Lexico (Oxford + Dictionary.com)", link: "https://www.lexico.com/" },
      ],
    },
  },

  EventsAndRules: {
    title: "LIBRARY EVENTS AND RULES",
    events: [
      "Every year after the admission of the students we organize Library Orientation Programme for both UG and PG new students of our College.",
      "In this programme we give them some information about NDC Library collections, services and e-resources and guide them how to use the resources in Library. And also create awareness to students about MOOCs course.",
      "Staff Orientation Programme",
      "We also organized a staff Orientation Programme for the teaching staff about the e-resources every year.",
    ],
    rulesRegulations: {
      title: "Library Rules and Regulations",
      sections: [
        "Library timings: 08:30 AM to 04:30 PM",
        "All the students admitted to UG or PG program are eligible to become members of the Library.",
        "Three books can be borrowed by a particular student according to 15 days duration. If the student crosses the due date, they have to pay 2 rupees per day per book.",
        "Journals and reference books cannot be issued. Students should refer within the Library for their assignment and project work.",
        "Thesis and Dissertation books are not issued to students.",
        "Books borrowed should be returned in good condition. Any damage, tearing of pages, writing with pencil or pen, soiling, etc., noticed at the time of return will require the member to replace the book or pay the cost immediately.",
        "If students lose a book, they must replace it with the same title, author, and publisher or pay double the cost of the book along with overdue charges in both cases.",
        "College identity card is compulsory while entering the Library. Students must check in with their ID card when entering the Library. After using the facilities of the Library, students must check out before leaving.",
        "Renewal of books will be done depending upon the number of copies available for other members' use.",
        "Entering the details of the student, including name, time in, time out, and signature, is compulsory while entering the Library. Pen drives, laptops, mobiles, data cables, and eatables are not allowed inside the Library.",
        "Personal books are not allowed in the Library.",
        "Keep your belongings in the property counter. Library staff are not responsible for your valuable items.",
        "Strict silence must be maintained inside the Library/reading room.",
        "Users should obey the Library rules and regulations. Violation of rules and any act of misbehavior towards Library staff will lead to strong disciplinary action.",
      ],
    },
  },
};

async function seedLibrary() {
  const Library = mongoose.model("Library");
  await Library.findOneAndUpdate(
    {},
    { data: LIBRARY_DATA },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );
  console.log("Seeded Library from LibraryContent.tsx.");
}

module.exports = { seedLibrary };
