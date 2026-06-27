const TRANSLATIONS = {
  eng: {
    cmdBadge: 'Command',
    flagBadge: 'Flag',
    argBadge: 'Argument',
    fallbackCmd: 'Custom or user-defined command. Please check the official man page.',
    fallbackFlag: 'Custom or command-specific option flag.',
    fallbackArg: 'Argument: value or option target passed to the command.',
    targetPath: 'Target Path: directory or file destination for this operation.',
    archiveFile: 'Archive File: filename of the archive to be created or extracted.',
    multiFlagHeader: 'Option breakdown:'
  },
  ara: {
    cmdBadge: 'أمر',
    flagBadge: 'خيار',
    argBadge: 'وسيط',
    fallbackCmd: 'أمر مخصص أو غير معروف - يرجى التحقق من الدليل الرسمي (man page).',
    fallbackFlag: 'خيار مخصص أو غير معروف للأمر المحدد.',
    fallbackArg: 'وسيط: قيمة أو ملف مستهدف ممرر للأمر.',
    targetPath: 'المسار المستهدف: المجلد أو الملف الهدف لهذه العملية.',
    archiveFile: 'ملف الأرشيف: اسم ملف الأرشيف المراد التعامل معه.',
    multiFlagHeader: 'تفصيل الخيارات:'
  }
};

const DATABASE = {
  // 1. User & Group Management
  'useradd': {
    desc: {
      eng: 'Create User: Creates a new user account.',
      ara: 'إنشاء مستخدم: يُنشئ حساب مستخدم جديد في النظام.'
    },
    flags: {
      '-m': { eng: 'Create Home: Creates the user\'s home directory.', ara: 'إنشاء مجلد المنزل: يُنشئ مجلد المنزل الخاص بالمستخدم الجديد تلقائياً.' },
      '-s': { eng: 'Shell: Specifies the login shell for the user.', ara: 'مفسر الأوامر: يحدد مفسر الأوامر (Shell) الافتراضي للمستخدم.' },
      '-g': { eng: 'Primary Group: Specifies the primary group for the user.', ara: 'المجموعة الأساسية: يحدد المجموعة الرئيسية للمستخدم.' },
      '-G': { eng: 'Groups: Specifies a list of supplementary groups.', ara: 'المجموعات الإضافية: يحدد المجموعات الإضافية التي ينتمي إليها المستخدم.' }
    }
  },
  'usermod': {
    desc: {
      eng: 'Modify User: Modifies an existing user account.',
      ara: 'تعديل مستخدم: يُعدل خصائص حساب مستخدم موجود في النظام.'
    },
    flags: {
      '-aG': { eng: 'Append Groups: Adds the user to supplementary groups without removing them from current ones.', ara: 'إضافة مجموعات: يضيف المستخدم لمجموعات إضافية دون حذفه من مجموعاته الحالية.' },
      '-l': { eng: 'Login Name: Changes the login name of the user.', ara: 'تغيير الاسم: يغير اسم تسجيل الدخول الخاص بالمستخدم.' },
      '-d': { eng: 'Home Directory: Specifies a new home directory for the user.', ara: 'مجلد المنزل: يحدد مساراً جديداً لمجلد المنزل الخاص بالمستخدم.' },
      '-L': { eng: 'Lock: Locks the user account.', ara: 'قفل الحساب: يقفل حساب المستخدم لمنعه من تسجيل الدخول.' },
      '-U': { eng: 'Unlock: Unlocks the user account.', ara: 'إلغاء قفل الحساب: يلغي قفل حساب المستخدم لتمكينه من تسجيل الدخول.' }
    }
  },
  'userdel': {
    desc: {
      eng: 'Delete User: Deletes a user account.',
      ara: 'حذف مستخدم: يحذف حساب مستخدم من النظام.'
    },
    flags: {
      '-r': { eng: 'Remove Home: Deletes the user\'s home directory and mail spool.', ara: 'حذف مجلد المنزل: يحذف حساب المستخدم مع مجلد المنزل وملف البريد الخاصين به.' },
      '-f': { eng: 'Force: Forces the removal of the user even if logged in.', ara: 'قسري: يفرض حذف حساب المستخدم حتى لو كان مسجلاً دخوله حالياً.' }
    }
  },
  'passwd': {
    desc: {
      eng: 'Password: Changes user passwords.',
      ara: 'كلمة المرور: يُستخدم لتغيير كلمة المرور الخاصة بالمستخدم.'
    },
    flags: {
      '-d': { eng: 'Delete password: removes the password for an account (makes it passwordless).', ara: 'حذف كلمة المرور: يحذف كلمة مرور الحساب ويجعله بدون كلمة مرور.' },
      '-l': { eng: 'Lock account: disables password login for the user.', ara: 'قفل الحساب: يعطل إمكانية تسجيل الدخول بكلمة المرور للمستخدم المحدد.' },
      '-u': { eng: 'Unlock account: enables password login for the locked user.', ara: 'إلغاء قفل الحساب: يفعل إمكانية تسجيل الدخول للحساب المغلق بكلمة المرور.' },
      '-S': { eng: 'Status: displays password status information for the user.', ara: 'حالة الحساب: يعرض معلومات حالة كلمة مرور حساب المستخدم.' }
    }
  },
  'groupadd': {
    desc: {
      eng: 'Create Group: Creates a new user group.',
      ara: 'إنشاء مجموعة: يُنشئ مجموعة مستخدمين جديدة في النظام.'
    },
    flags: {
      '-g': { eng: 'GID: Specifies a unique group ID.', ara: 'معرف المجموعة: يحدد معرفاً رقمياً فريداً ومخصصاً للمجموعة.' }
    }
  },
  'groupmod': {
    desc: {
      eng: 'Modify Group: Modifies a group definition.',
      ara: 'تعديل مجموعة: يُعدل اسم أو معرف مجموعة مستخدمين موجودة.'
    },
    flags: {
      '-n': { eng: 'New Name: Changes the name of the group.', ara: 'الاسم الجديد: يغير الاسم الحالي للمجموعة إلى اسم جديد.' },
      '-g': { eng: 'New GID: Changes the group ID.', ara: 'المعرف الجديد: يغير معرف المجموعة الرقمي إلى قيمة جديدة.' }
    }
  },
  'groupdel': {
    desc: {
      eng: 'Delete Group: Deletes a user group.',
      ara: 'حذف مجموعة: يحذف مجموعة مستخدمين من النظام.'
    },
    flags: {}
  },

  // 2. File & Directory Operations
  'ls': {
    desc: {
      eng: 'List: Lists directory contents (files and folders).',
      ara: 'عرض المحتويات: يسرد الملفات والمجلدات داخل الدليل الحالي.'
    },
    flags: {
      '-l': { eng: 'Long listing format: shows file permissions, ownership, size, and modification date.', ara: 'تنسيق القائمة الطويلة: يعرض صلاحيات الملفات، والمالك، والحجم، وتاريخ التعديل.' },
      '-a': { eng: 'Show all: includes hidden files (those starting with a dot ".").', ara: 'عرض الكل: يشمل الملفات المخفية (التي تبدأ أسماؤها بنقطة ".").' },
      '-la': { eng: 'Combines long listing (-l) and showing hidden files (-a).', ara: 'يجمع بين عرض القائمة الطويلة (-l) وإظهار الملفات المخفية (-a).' },
      '-h': { eng: 'Human-readable: prints sizes in easy-to-read formats (e.g., 1K, 234M, 2G).', ara: 'صيغة سهلة القراءة: يعرض الأحجام بوحدات مفهومة (مثل: كيلوبايت، ميجابايت، جيجابايت).' },
      '-R': { eng: 'Recursive: lists subdirectories recursively.', ara: 'عرض متكرر: يسرد محتويات المجلد والمجلدات الفرعية منه بشكل متكرر.' },
      '-t': { eng: 'Sort by time: sorts files by modification time, newest first.', ara: 'ترتيب زمني: يرتب الملفات حسب تاريخ التعديل، الأحدث أولاً.' }
    }
  },
  'cd': {
    desc: {
      eng: 'Change Directory: Used to navigate between system folders.',
      ara: 'تغيير الدليل: يُسْتَخدم للانتقال بين مجلدات النظام.'
    },
    flags: {}
  },
  'pwd': {
    desc: {
      eng: 'Print Working Directory: Shows the full path of the current folder.',
      ara: 'طباعة دليل العمل الحالي: يظهر المسار الكامل للمجلد الذي تقف فيه الآن.'
    },
    flags: {}
  },
  'mkdir': {
    desc: {
      eng: 'Make Directory: Creates a new folder.',
      ara: 'إنشاء مجلد: يُنشئ دليلاً جديداً في المسار المحدد.'
    },
    flags: {
      '-p': { eng: 'Parents: makes parent directories as needed, no error if existing.', ara: 'المجلد الأبوي: ينشئ المجلدات الفرعية والأبوية تلقائياً دون إظهار خطأ إذا كانت موجودة.' },
      '-v': { eng: 'Verbose: displays a message for each created directory.', ara: 'توضيحي: يعرض رسالة تفصيلية لكل مجلد يتم إنشاؤه.' }
    }
  },
  'rm': {
    desc: {
      eng: 'Remove: Used to delete files or directories.',
      ara: 'حذف: يُستخدم لحذف الملفات أو المجلدات.'
    },
    flags: {
      '-r': { eng: 'Recursive: remove directories and their contents recursively.', ara: 'حذف متكرر: حذف المجلدات ومحتوياتها بالكامل بشكل متكرر.' },
      '-f': { eng: 'Force: ignore nonexistent files and arguments, never prompt.', ara: 'فرض الحذف: يتجاهل الملفات غير الموجودة ولا يطلب تأكيداً أبداً.' },
      '-rf': { eng: 'Force recursive deletion: deletes directories and all contents immediately without prompting.', ara: 'حذف متكرر وقسري: يحذف المجلد وجميع محتوياته فوراً دون طلب تأكيد.' },
      '-i': { eng: 'Interactive: prompts before every removal.', ara: 'تفاعلي: يطلب تأكيداً من المستخدم قبل حذف كل ملف.' }
    }
  },
  'cp': {
    desc: {
      eng: 'Copy: Copies files or directories from source to destination.',
      ara: 'نسخ: ينسخ الملفات أو المجلدات من مسار المصدر إلى الوجهة.'
    },
    flags: {
      '-r': { eng: 'Recursive: copies directories recursively.', ara: 'نسخ متكرر: ينسخ المجلدات بكافة محتوياتها الفرعية.' },
      '-i': { eng: 'Interactive: prompts before overwriting an existing file.', ara: 'تفاعلي: يطلب تأكيداً قبل الكتابة فوق ملف موجود.' },
      '-p': { eng: 'Preserve: preserves file attributes (permissions, ownership, timestamps).', ara: 'حفظ الخصائص: يحافظ على صلاحيات الملف، والمالك، والتواريخ الأصلية.' },
      '-v': { eng: 'Verbose: shows files as they are copied.', ara: 'توضيحي: يعرض تفاصيل وأسماء الملفات أثناء نسخها.' }
    }
  },
  'mv': {
    desc: {
      eng: 'Move / Rename: Moves files or directories, or renames them.',
      ara: 'نقل / إعادة تسمية: ينقل الملفات والمجلدات أو يغير أسماءها.'
    },
    flags: {
      '-i': { eng: 'Interactive: prompts before overwriting.', ara: 'تفاعلي: يطلب تأكيداً قبل استبدال أي ملف موجود في الوجهة.' },
      '-f': { eng: 'Force: overwrites without prompting.', ara: 'قسري: يستبدل الملفات الموجودة مباشرة دون طلب تأكيد.' },
      '-v': { eng: 'Verbose: prints names of moved files.', ara: 'توضيحي: يعرض تفاصيل وأسماء الملفات التي يتم نقلها.' }
    }
  },
  'touch': {
    desc: {
      eng: 'Touch: Creates a new empty file or updates the timestamp of an existing file.',
      ara: 'إنشاء ملف / تحديث الوقت: يُنشئ ملفاً فارغاً جديداً أو يحدّث طابع الوقت لملف موجود.'
    },
    flags: {
      '-a': { eng: 'Change access time only.', ara: 'تغيير وقت الوصول: يحدّث وقت آخر وصول للملف فقط.' },
      '-m': { eng: 'Change modification time only.', ara: 'تغيير وقت التعديل: يحدّث وقت تعديل الملف فقط.' }
    }
  },
  'chmod': {
    desc: {
      eng: 'Change Mode: Changes file or directory permissions.',
      ara: 'تغيير الصلاحيات: يُغير صلاحيات القراءة والكتابة والتنفيذ للملفات والمجلدات.'
    },
    flags: {
      '-R': { eng: 'Recursive: changes permissions recursively.', ara: 'تغيير متكرر: يغير الصلاحيات للمجلد وكافة محتوياته الداخلية.' },
      '-v': { eng: 'Verbose: outputs diagnostic info for processed files.', ara: 'توضيحي: يعرض رسالة توضيحية لكل ملف يتم تعديل صلاحياته.' }
    }
  },
  'chown': {
    desc: {
      eng: 'Change Owner: Changes file owner and group ownership.',
      ara: 'تغيير المالك: يغير ملكية الملف لمستخدم أو مجموعة معينة.'
    },
    flags: {
      '-R': { eng: 'Recursive: changes ownership recursively.', ara: 'تغيير متكرر: يغير المالك للمجلد وكافة محتوياته الفرعية.' },
      '-h': { eng: 'Affect symbolic links instead of referenced files.', ara: 'الروابط الرمزية: يغير ملكية الرابط الرمزي نفسه بدلاً من الملف الأصلي.' }
    }
  },
  'ln': {
    desc: {
      eng: 'Link: Creates links between files.',
      ara: 'إنشاء رابط: يُنشئ روابط (روابط صلبة أو رمزية) بين الملفات.'
    },
    flags: {
      '-s': { eng: 'Symbolic: creates a symbolic link (soft link) instead of a hard link.', ara: 'رابط رمزي: ينشئ رابطاً رمزياً (مؤشراً) بدلاً من رابط صلب.' },
      '-f': { eng: 'Force: removes existing destination files.', ara: 'قسري: يزيل أي ملفات موجودة مسبقاً في مسار الرابط.' }
    }
  },
  'file': {
    desc: {
      eng: 'File Type: Determines the file type.',
      ara: 'نوع الملف: يحدد نوع وصيغة الملفات المستهدفة.'
    },
    flags: {
      '-b': { eng: 'Brief: do not prepend filenames to output lines.', ara: 'مختصر: يعرض نوع الملف مباشرة دون إظهار اسمه في النتيجة.' },
      '-i': { eng: 'Mime: causes the file command to output mime type strings.', ara: 'نوع ميم: يعرض نوع الملف بصيغة Mime Type القياسية.' }
    }
  },

  // 3. Search & Text Processing
  'grep': {
    desc: {
      eng: 'Global Regular Expression Print: Searches text patterns in files.',
      ara: 'البحث عن النصوص: يبحث عن نصوص معينة أو تعبيرات نمطية داخل الملفات.'
    },
    flags: {
      '-i': { eng: 'Ignore case: searches case-insensitively.', ara: 'تجاهل حالة الأحرف: يبحث دون التمييز بين الأحرف الكبيرة والصغيرة.' },
      '-v': { eng: 'Invert match: selects non-matching lines.', ara: 'عكس البحث: يعرض السطور التي لا تحتوي على النص المبحوث عنه.' },
      '-r': { eng: 'Recursive: searches directories recursively.', ara: 'بحث متكرر: يبحث داخل المجلد وجميع الملفات والمجلدات الفرعية.' },
      '-n': { eng: 'Line number: prints line numbers with output lines.', ara: 'أرقام السطور: يعرض رقم السطر الذي يحتوي على النص المطابق.' },
      '-l': { eng: 'Files with matches: prints only names of files with matches.', ara: 'أسماء الملفات: يعرض فقط أسماء الملفات التي تحتوي على النص المبحوث عنه.' }
    }
  },
  'find': {
    desc: {
      eng: 'Find: Searches for files in a directory hierarchy.',
      ara: 'البحث عن ملفات: يبحث عن الملفات والمجلدات بناءً على معايير محددة.'
    },
    flags: {
      '-name': { eng: 'Name: searches files by name pattern.', ara: 'الاسم: يبحث عن الملفات التي تطابق نمط اسم معين.' },
      '-type': { eng: 'Type: searches by file type (e.g., f for file, d for directory).', ara: 'النوع: يحدد نوع الهدف المبحوث عنه (ملف f، أو مجلد d).' },
      '-mtime': { eng: 'Modification time: searches by modification time in days.', ara: 'تاريخ التعديل: يبحث عن الملفات التي عُدلت قبل عدد معين من الأيام.' },
      '-size': { eng: 'Size: searches by file size.', ara: 'الحجم: يبحث عن الملفات التي تطابق حجماً معيناً.' }
    }
  },
  'locate': {
    desc: {
      eng: 'Locate: Finds files by name using a pre-built index database.',
      ara: 'تحديد موقع الملفات: يبحث عن الملفات بسرعة باستخدام قاعدة بيانات الفهرس الجاهزة.'
    },
    flags: {
      '-i': { eng: 'Ignore case: searches case-insensitively.', ara: 'تجاهل حالة الأحرف: يبحث دون تفريق بين الأحرف الكبيرة والصغيرة.' },
      '-c': { eng: 'Count: prints only the number of matching files.', ara: 'العدد: يعرض فقط إجمالي عدد الملفات المطابقة للبحث.' }
    }
  },
  'sed': {
    desc: {
      eng: 'Stream Editor: Used to perform basic text transformations on input streams.',
      ara: 'محرر النصوص المتدفق: يُستخدم لتعديل النصوص واستبدال الكلمات داخل الملفات.'
    },
    flags: {
      '-i': { eng: 'In-place: edits files in-place (saves directly to the file).', ara: 'تعديل مباشر: يحفظ التعديلات مباشرة داخل الملف الأصلي.' },
      '-e': { eng: 'Expression: adds script to the commands to be executed.', ara: 'تعبير برمجي: يحدد التعبير أو النص البرمجي المراد تنفيذه.' }
    }
  },
  'awk': {
    desc: {
      eng: 'AWK: A pattern scanning and processing language for text files.',
      ara: 'لغة أوك: لغة معالجة نصوص وفحص أنماط ممتازة لتصفية وتنسيق البيانات.'
    },
    flags: {
      '-F': { eng: 'Field separator: defines input field separator.', ara: 'محدد الحقول: يحدد الرمز الفاصل بين الأعمدة (مثل الفاصلة أو النقطة).' }
    }
  },
  'cut': {
    desc: {
      eng: 'Cut: Removes sections from each line of files.',
      ara: 'قص النصوص: يقتطع أجزاء محددة (أعمدة أو أحرف) من كل سطر.'
    },
    flags: {
      '-d': { eng: 'Delimiter: specifies field delimiter.', ara: 'المحدد: يحدد الرمز الفاصل بين الحقول عند استخدام خيار الحقول.' },
      '-f': { eng: 'Fields: selects only these fields.', ara: 'الحقول: يحدد رقم الحقل أو العمود المراد قصه وعرضه.' },
      '-c': { eng: 'Characters: selects only these characters.', ara: 'الأحرف: يحدد أرقام الأحرف المحددة لقصها من كل سطر.' }
    }
  },
  'sort': {
    desc: {
      eng: 'Sort: Sorts lines of text files.',
      ara: 'فرز: يرتب السطور في ملفات النصوص تصاعدياً أو تنازلياً.'
    },
    flags: {
      '-n': { eng: 'Numeric sort: compare according to string numerical value.', ara: 'فرز رقمي: يرتب السطور عددياً بدلاً من الترتيب الأبجدي.' },
      '-r': { eng: 'Reverse: reverses the result of comparisons.', ara: 'عكس الفرز: يعكس ترتيب الفرز ليصبح تنازلياً.' },
      '-u': { eng: 'Unique: outputs unique lines (removes duplicates).', ara: 'فرز فريد: يعرض السطور الفريدة فقط ويزيل المتكرر.' }
    }
  },
  'uniq': {
    desc: {
      eng: 'Unique: Reports or omits repeated lines in a sorted file.',
      ara: 'تصفية التكرار: يعرض السطور غير المتكررة أو يزيل التكرار المتتالي.'
    },
    flags: {
      '-c': { eng: 'Count: prefixes lines by the number of occurrences.', ara: 'عد التكرار: يعرض عدد مرات تكرار كل سطر بجانبه.' },
      '-d': { eng: 'Repeated: only print duplicate lines.', ara: 'عرض المتكرر: يعرض السطور التي تكررت في الملف فقط.' },
      '-u': { eng: 'Unique: only print unique lines.', ara: 'عرض غير المتكرر: يعرض السطور التي لم تتكرر على الإطلاق.' }
    }
  },
  'wc': {
    desc: {
      eng: 'Word Count: Prints newline, word, and byte counts for files.',
      ara: 'عد الكلمات: يحسب عدد السطور، والكلمات، والأحرف/البايتات في الملفات.'
    },
    flags: {
      '-l': { eng: 'Lines: prints only the newline count.', ara: 'السطور: يعرض عدد الأسطر فقط في الملف.' },
      '-w': { eng: 'Words: prints only the word count.', ara: 'الكلمات: يعرض عدد الكلمات فقط.' },
      '-c': { eng: 'Bytes: prints only the byte count.', ara: 'البايتات: يعرض حجم الملف بالبايتات فقط.' },
      '-m': { eng: 'Chars: prints only the character count.', ara: 'الأحرف: يعرض عدد الأحرف فقط.' }
    }
  },
  'diff': {
    desc: {
      eng: 'Difference: Compares files line by line.',
      ara: 'مقارنة الملفات: يقارن بين ملفين ويعرض الاختلافات بينهما سطراً بسطر.'
    },
    flags: {
      '-u': { eng: 'Unified format: outputs differences in unified diff format.', ara: 'تنسيق موحد: يعرض الفروقات بصيغة Diff الموحدة والسهلة للقراءة.' },
      '-w': { eng: 'Ignore white space: ignores all white space when comparing lines.', ara: 'تجاهل المسافات: يتجاهل الفراغات والمسافات البيضاء عند المقارنة.' }
    }
  },

  // 4. File Viewing & Editing
  'head': {
    desc: {
      eng: 'Head: Outputs the first part (lines) of files.',
      ara: 'بداية الملف: يعرض السطور الأولى من الملف المحدد.'
    },
    flags: {
      '-n': { eng: 'Lines: prints the first N lines instead of the default 10.', ara: 'عدد الأسطر: يحدد عدد الأسطر المراد عرضها من البداية.' }
    }
  },
  'tail': {
    desc: {
      eng: 'Tail: Outputs the last part (lines) of files.',
      ara: 'نهاية الملف: يعرض السطور الأخيرة من الملف المحدد.'
    },
    flags: {
      '-n': { eng: 'Lines: prints the last N lines instead of the default 10.', ara: 'عدد الأسطر: يحدد عدد الأسطر المراد عرضها من النهاية.' },
      '-f': { eng: 'Follow: appends data as the file grows (useful for active log files).', ara: 'متابعة حية: يعرض نهاية الملف بشكل مستمر أثناء تحديثه وكتابة بيانات جديدة فيه.' }
    }
  },
  'less': {
    desc: {
      eng: 'Less: View file contents page-by-page dynamically.',
      ara: 'عرض مقسم: يعرض محتويات الملف بشكل مقسم ومريح مع إمكانية التمرير لأعلى ولأسفل.'
    },
    flags: {
      '-N': { eng: 'Line numbers: displays line numbers.', ara: 'أرقام الأسطر: يعرض أرقام الأسطر بجانب المحتوى.' }
    }
  },
  'more': {
    desc: {
      eng: 'More: View file contents page-by-page statically.',
      ara: 'عرض صفحة بصفحة: يعرض محتويات الملف صفحة بصفحة (تمرير لأسفل فقط).'
    },
    flags: {}
  },
  'cat': {
    desc: {
      eng: 'Concatenate: Displays file contents, concatenates files, or redirects inputs.',
      ara: 'عرض / دمج: يعرض محتوى الملف، أو يدمج عدة ملفات معاً.'
    },
    flags: {
      '-n': { eng: 'Number: numbers all output lines.', ara: 'ترقيم الأسطر: يعرض أرقاماً متسلسلة للأسطور.' },
      '-b': { eng: 'Number nonblank: numbers nonempty output lines.', ara: 'ترقيم الأسطر غير الفارغة: يرقم فقط الأسطر التي تحتوي على نصوص.' }
    }
  },
  'vi': {
    desc: {
      eng: 'VI Editor: Visual screen-oriented text editor.',
      ara: 'محرر في آي: محرر نصوص قوي ومثبت افتراضياً في معظم توزيعات لينوكس.'
    },
    flags: {}
  },
  'nano': {
    desc: {
      eng: 'Nano Editor: A simple, user-friendly command-line text editor.',
      ara: 'محرر نانو: محرر نصوص بسيط وسهل الاستخدام للمبتدئين.'
    },
    flags: {}
  },

  // 5. System Info & Hardware
  'uname': {
    desc: {
      eng: 'Unix Name: Prints detailed system and kernel information.',
      ara: 'معلومات النظام: يعرض معلومات تفصيلية عن النواة وتوزيعة النظام المعمول بها.'
    },
    flags: {
      '-a': { eng: 'All: prints all system information.', ara: 'الكل: يعرض كافة معلومات النظام دفعة واحدة.' },
      '-r': { eng: 'Release: prints the kernel release version.', ara: 'إصدار النواة: يعرض إصدار نواة لينوكس المفعلة حالياً.' },
      '-m': { eng: 'Machine: prints the machine hardware name (architecture).', ara: 'المعمارية: يعرض معمارية المعالج والجهاز (مثال: x86_64).' }
    }
  },
  'uptime': {
    desc: {
      eng: 'Uptime: Shows how long the system has been running, logged-in users, and load averages.',
      ara: 'مدة التشغيل: يعرض مدة عمل النظام المستمرة، وعدد المستخدمين، وحجم الضغط الحالي.'
    },
    flags: {
      '-p': { eng: 'Pretty format: shows uptime in an easy-to-read format.', ara: 'صيغة سهلة: يعرض مدة التشغيل بصيغة مبسطة وسهلة الفهم.' }
    }
  },
  'free': {
    desc: {
      eng: 'Free: Displays free and used physical and swap memory in the system.',
      ara: 'الذاكرة الحرة: يعرض حجم الذاكرة العشوائية (RAM) المستهلكة والحرة ونظام التبادل (Swap).'
    },
    flags: {
      '-h': { eng: 'Human-readable: prints memory values in GB/MB formats.', ara: 'سهل القراءة: يعرض قيم الذاكرة بوحدات مناسبة كالميجابايت والجيجابايت.' },
      '-m': { eng: 'Megabytes: displays memory in megabytes.', ara: 'ميجابايت: يعرض الذاكرة بوحدة الميجابايت.' }
    }
  },
  'df': {
    desc: {
      eng: 'Disk Free: Displays remaining and used disk space on active filesystems.',
      ara: 'مساحة القرص الحرة: يعرض حجم المساحة الفارغة والمستهلكة في وحدات التخزين المختلفة.'
    },
    flags: {
      '-h': { eng: 'Human-readable: prints sizes in GB or MB formats.', ara: 'سهل القراءة: يعرض المساحات بوحدات قياس مناسبة (مثل ميجابايت، جيجابايت).' },
      '-T': { eng: 'Type: prints filesystem type (e.g. ext4, tmpfs).', ara: 'نوع الملفات: يعرض نوع نظام الملفات لكل وحدة تخزين.' }
    }
  },
  'du': {
    desc: {
      eng: 'Disk Usage: Estimates file and directory space usage.',
      ara: 'استهلاك القرص: يقدر ويحسب حجم استهلاك المساحة للملفات والمجلدات.'
    },
    flags: {
      '-h': { eng: 'Human-readable: prints sizes in human-friendly formats.', ara: 'سهل القراءة: يعرض مساحات الملفات بوحدات قياس سهلة الفهم.' },
      '-s': { eng: 'Summarize: displays only a total for each argument.', ara: 'ملخص: يعرض الحجم الإجمالي الإجمالي للمجلد بالكامل دون تفصيل ملفاته.' }
    }
  },
  'lspci': {
    desc: {
      eng: 'List PCI: Lists all PCI devices installed in the system.',
      ara: 'أجهزة PCI: يسرد كافة الأجهزة المتصلة بمدخل PCI (مثل كرت الشاشة والشبكة).'
    },
    flags: {
      '-v': { eng: 'Verbose: displays detailed information about devices.', ara: 'توضيحي: يعرض معلومات تفصيلية وإضافية عن الأجهزة.' }
    }
  },
  'lsusb': {
    desc: {
      eng: 'List USB: Lists USB controllers and connected USB devices.',
      ara: 'أجهزة USB: يسرد المنافذ والأجهزة المتصلة بجهازك عبر الـ USB.'
    },
    flags: {
      '-v': { eng: 'Verbose: displays detailed USB device configuration.', ara: 'توضيحي: يعرض تفاصيل فنية وإعدادات أجهزة الـ USB المتصلة.' }
    }
  },
  'dmesg': {
    desc: {
      eng: 'Diagnostic Messages: Prints the kernel diagnostic and log ring buffer messages.',
      ara: 'سجلات النواة: يعرض رسائل وسجلات النواة وتفاعل العتاد مع النظام.'
    },
    flags: {
      '-T': { eng: 'Human-readable timestamps: converts seconds count to readable dates.', ara: 'طوابع زمنية: يعرض التوقيت بصيغة تاريخ ووقت مقروءة.' },
      '-l': { eng: 'Level: restricts output to specified log levels (e.g., err, warn).', ara: 'المستوى: يعرض فقط الأخطاء المطابقة للمستوى المحدد كالأخطاء أو التحذيرات.' }
    }
  },
  'hostname': {
    desc: {
      eng: 'Hostname: Shows or sets the system\'s host name.',
      ara: 'اسم المضيف: يعرض أو يحدد اسم جهاز الكمبيوتر على الشبكة.'
    },
    flags: {
      '-I': { eng: 'IP Addresses: displays all network addresses assigned to this host.', ara: 'عناوين الآي بي: يعرض كافة عناوين الشبكة (IP) المرتبطة بهذا الجهاز.' }
    }
  },
  'date': {
    desc: {
      eng: 'Date: Prints or sets the system date and time.',
      ara: 'التاريخ: يعرض أو يضبط تاريخ ووقت النظام الحالي.'
    },
    flags: {
      '-u': { eng: 'UTC: prints time in Universal Coordinated Time.', ara: 'التوقيت العالمي: يعرض الوقت الحالي بتوقيت جرينتش UTC.' }
    }
  },
  'cal': {
    desc: {
      eng: 'Calendar: Displays a calendar of the current month.',
      ara: 'التقويم: يعرض تقويم الشهر الحالي في الطرفية.'
    },
    flags: {
      '-y': { eng: 'Year: displays a calendar for the whole current year.', ara: 'السنة بالكامل: يعرض تقويم السنة الحالية بالكامل.' }
    }
  },

  // 6. Process & Job Management
  'top': {
    desc: {
      eng: 'Table of Processes: Displays real-time Linux task activities and system resource usage.',
      ara: 'جدول العمليات: يعرض استهلاك موارد الجهاز والعمليات النشطة في الوقت الحقيقي.'
    },
    flags: {}
  },
  'htop': {
    desc: {
      eng: 'Interactive Process Viewer: A modern, interactive process viewer for Linux terminal.',
      ara: 'مستعرض العمليات التفاعلي: واجهة رسومية وتفاعلية ممتازة لتتبع استهلاك المعالج والرام والعمليات.'
    },
    flags: {}
  },
  'ps': {
    desc: {
      eng: 'Process Status: Reports a snapshot of the current active system processes.',
      ara: 'حالة العمليات: يلتقط صورة لجميع العمليات النشطة في النظام في هذه اللحظة.'
    },
    flags: {
      '-ef': { eng: 'Full format: lists all processes on the system with full detail.', ara: 'تنسيق كامل: يسرد كافة العمليات الجارية مع تفاصيل المالك والمعرف.' },
      'aux': { eng: 'All user processes: lists all processes currently running, with CPU/Memory usage info.', ara: 'كافة العمليات: يسرد جميع العمليات لجميع مستخدمي النظام مع توضيح حجم استهلاك الرام والمعالج.' }
    }
  },
  'kill': {
    desc: {
      eng: 'Kill: Sends a termination signal to specific active processes via PID.',
      ara: 'إنهاء العملية: يرسل إشارات إغلاق أو إنهاء لعملية معينة باستخدام رقم المعرف (PID).'
    },
    flags: {
      '-9': { eng: 'Force kill: sends the SIGKILL signal to force immediate termination.', ara: 'إنهاء قسري: يرسل إشارة SIGKILL لإغلاق البرنامج فوراً دون انتظار حفظ الملفات.' },
      '-15': { eng: 'Terminate gracefully: sends SIGTERM for safe closing.', ara: 'إغلاق آمن: يرسل إشارة SIGTERM الافتراضية لغلق البرنامج بأمان.' }
    }
  },
  'killall': {
    desc: {
      eng: 'Kill All: Kills active processes matching the specified process name.',
      ara: 'إنهاء الكل بالاسم: يغلق جميع العمليات النشطة التي تطابق الاسم المحدد.'
    },
    flags: {
      '-9': { eng: 'Force kill: sends SIGKILL signal to force immediately.', ara: 'إنهاء قسري: يفرض إغلاق كافة البرامج المطابقة للاسم فورا وبقوة.' }
    }
  },
  'pgrep': {
    desc: {
      eng: 'Process Grep: Searches active process PIDs matching specified patterns.',
      ara: 'البحث عن عمليات: يبحث عن معرفات العمليات (PIDs) التي تطابق اسماً معيناً.'
    },
    flags: {
      '-l': { eng: 'List name: displays the process name alongside the PID.', ara: 'اسم العملية: يعرض اسم البرنامج والعملية بجوار رقم المعرف الخاص بها.' }
    }
  },
  'nohup': {
    desc: {
      eng: 'No Hang Up: Runs a command immune to hangups, allowing it to continue running in background after logout.',
      ara: 'لا قطع: يشغل أمراً يحميه من الانقطاع عند تسجيل الخروج أو إغلاق الطرفية.'
    },
    flags: {}
  },
  'screen': {
    desc: {
      eng: 'Screen Multiplexer: Multiplexes physical terminals into virtual sessions (allows background persistence).',
      ara: 'شاشة افتراضية: يقسم الطرفية لعدة جلسات افتراضية مستقلة تعمل في الخلفية.'
    },
    flags: {
      '-S': { eng: 'Session name: names the newly created virtual session.', ara: 'تسمية الجلسة: يحدد اسماً مخصصاً لجلسة الشاشة الجديدة.' },
      '-r': { eng: 'Resume: resumes a detached screen session.', ara: 'استئناف: يستأنف جلسة سابقة تم فصلها.' }
    }
  },
  'tmux': {
    desc: {
      eng: 'Terminal Multiplexer: Modern workspace multiplexer supporting panels and background sessions.',
      ara: 'مقسم الطرفية: محاكي طرفي حديث يتيح تقسيم الشاشة إلى لوحات متعددة مع حفظ الجلسات بالخلفية.'
    },
    flags: {
      'attach': { eng: 'Attach: attaches to an existing tmux session.', ara: 'ربط: يتصل بجلسة tmux سابقة تعمل بالخلفية.' }
    }
  },

  // 7. System Services & Control
  'systemctl': {
    desc: {
      eng: 'System Control: Manages systemd services and system states.',
      ara: 'التحكم بالخدمات: يُسْتَخدم لإدارة الخدمات (شغل، أوقف، أعد تشغيل) وإعدادات النظام الأساسية.'
    },
    flags: {
      'start': { eng: 'Start service: activates a service immediately.', ara: 'تشغيل الخدمة: يُفعل الخدمة المحددة فوراً.' },
      'stop': { eng: 'Stop service: deactivates a service immediately.', ara: 'إيقاف الخدمة: يعطل الخدمة المحددة فوراً.' },
      'restart': { eng: 'Restart service: stops and starts a service.', ara: 'إعادة تشغيل الخدمة: يوقف الخدمة ويعيد تشغيلها مجدداً.' },
      'status': { eng: 'Status: prints current execution status of a service.', ara: 'حالة الخدمة: يعرض معلومات التشغيل الحالية للخدمة وأخطاءها الأخيرة.' },
      'enable': { eng: 'Enable service: sets the service to start automatically on system boot.', ara: 'تمكين تلقائي: يضبط الخدمة لتبدأ تلقائياً مع إقلاع النظام.' }
    }
  },
  'journalctl': {
    desc: {
      eng: 'Journal Control: Queries and displays logs generated by systemd.',
      ara: 'سجلات الخدمات: يستعرض ويفحص سجلات النظام والخدمات المسجلة عبر نظام systemd.'
    },
    flags: {
      '-u': { eng: 'Unit: filters logs to only show messages for a specific unit/service.', ara: 'الخدمة المحددة: يعرض فقط السجلات المرتبطة بخدمة معينة.' },
      '-f': { eng: 'Follow: shows logs live as they are written.', ara: 'متابعة حية: يعرض السجلات مباشرة في الوقت الحقيقي أثناء كتابتها.' },
      '-n': { eng: 'Lines: specifies how many trailing log lines to print.', ara: 'عدد الأسطر: يحدد عدد الأسطر الأخيرة المراد استعراضها.' }
    }
  },
  'crontab': {
    desc: {
      eng: 'Cron Table: Schedules periodic tasks and commands (cron jobs).',
      ara: 'جدول المهام: يُستخدم لجدولة تنفيذ الأوامر والمهام التلقائية في أوقات محددة.'
    },
    flags: {
      '-e': { eng: 'Edit: edits the active user crontab file.', ara: 'تعديل الجدول: يفتح ملف جدولة المهام للتعديل والإضافة.' },
      '-l': { eng: 'List: displays the content of the user crontab.', ara: 'عرض الجدول: يسرد المهام المجدولة النشطة حالياً للمستخدم.' },
      '-r': { eng: 'Remove: removes all scheduled cron jobs for the user.', ara: 'حذف الجدول: يحذف جدول المهام المجدولة بالكامل للمستخدم.' }
    }
  },

  // 8. Disk & Block Device Management
  'mount': {
    desc: {
      eng: 'Mount: Mounts filesystems or block devices to directory paths.',
      ara: 'ربط وحدة التخزين: يربط القرص الصلب أو الفلاشة بمجلد محدد للوصول لملفاتها.'
    },
    flags: {
      '-t': { eng: 'Type: specifies the filesystem type (e.g., vfat, ext4).', ara: 'نوع الملفات: يحدد نوع نظام الملفات الخاص بالقرص.' }
    }
  },
  'umount': {
    desc: {
      eng: 'Unmount: Safely detaches mounted filesystems and block devices.',
      ara: 'فصل وحدة التخزين: يفصل القرص الصلب أو الفلاشة بأمان لضمان عدم ضياع البيانات.'
    },
    flags: {
      '-f': { eng: 'Force: forces unmounting (useful if device is busy).', ara: 'فصل قسري: يفرض فصل وحدة التخزين حتى لو كانت مشغولة بالعمل حالياً.' }
    }
  },
  'mkfs': {
    desc: {
      eng: 'Make Filesystem: Creates a filesystem on a device partition (formats device).',
      ara: 'تهيئة القرص: يقوم بتهيئة بارتشن أو وحدة تخزين لإنشاء نظام ملفات جديد.'
    },
    flags: {
      '-t': { eng: 'Type: specifies the filesystem type to format with.', ara: 'نوع الملفات: يحدد نوع نظام الملفات المراد التهيئة به (مثل ext4).' }
    }
  },
  'fsck': {
    desc: {
      eng: 'Filesystem Check: Checks and repairs errors in a filesystem.',
      ara: 'فحص القرص: يفحص ويصلح أخطاء ومشاكل نظام الملفات.'
    },
    flags: {
      '-a': { eng: 'Automatic: automatically repairs errors without prompting.', ara: 'إصلاح تلقائي: يصلح جميع الأخطاء المكتشفة تلقائياً دون سؤال المستخدم.' }
    }
  },
  'fdisk': {
    desc: {
      eng: 'Format Disk: Manipulates partition tables on disk storage.',
      ara: 'تقسيم القرص: يُستخدم لاستعراض وإنشاء وحذف بارتشنات الأقراص الصلبة.'
    },
    flags: {
      '-l': { eng: 'List: lists partition tables of all detected disk devices.', ara: 'عرض الأقسام: يسرد جميع الأقسام المكتشفة ومساحات الأقراص المتصلة.' }
    }
  },
  'parted': {
    desc: {
      eng: 'Partition Editor: Modern disk partitioning and partition resizing program.',
      ara: 'محرر أقسام القرص: برنامج تقسيم قرص متطور يدعم مساحات تخزين ضخمة وتقسيم GPT.'
    },
    flags: {
      '-l': { eng: 'List: displays partitioning layouts of all disks.', ara: 'عرض الأقسام: يعرض جدول أقسام كافة الأقراص الصلبة.' }
    }
  },
  'blkid': {
    desc: {
      eng: 'Block ID: Locates and prints block device UUID attributes and filesystem types.',
      ara: 'معرف الأقراص: يعرض المعرف الفريد (UUID) ونوع نظام الملفات لكل بارتشن.'
    },
    flags: {}
  },
  'dd': {
    desc: {
      eng: 'Disk Duplicator: Converts and copies files, commonly used for writing OS ISOs to USB block devices.',
      ara: 'نسخ الأقراص: ينسخ البيانات الخام مباشرة من مصدر لوجهة (يُستخدم لحرق نسخ نظام التشغيل على الفلاشات).'
    },
    flags: {
      'if=': { eng: 'Input File: specifies the source file or device path.', ara: 'الملف المصدر: يحدد مسار الملف أو القرص المصدر المراد النسخ منه.' },
      'of=': { eng: 'Output File: specifies the target destination file or device path.', ara: 'الملف الهدف: يحدد مسار الملف أو القرص الهدف المراد الكتابة فوقه.' },
      'bs=': { eng: 'Block Size: specifies how many bytes to write per block.', ara: 'حجم البلوك: يحدد مساحة البيانات المكتوبة في كل مرة.' }
    }
  },

  // 9. Networking & Data Transfer
  'wget': {
    desc: {
      eng: 'Web Get: Downloads files from the internet over HTTP, HTTPS, or FTP.',
      ara: 'تحميل ملفات: يحمل الملفات من روابط الإنترنت مباشرة من خلال الطرفية.'
    },
    flags: {
      '-O': { eng: 'Output document: saves the downloaded file under a custom name.', ara: 'تسمية الملف: يحفظ الملف المحمل باسم مخصص يحدده المستخدم.' },
      '-c': { eng: 'Continue: resumes an interrupted file download.', ara: 'استئناف التحميل: يستأنف تحميل ملف غير مكتمل التحميل.' },
      '-b': { eng: 'Background: runs the file download in background.', ara: 'تشغيل بالخلفية: يبدأ عملية التحميل في الخلفية ويحرر الطرفية.' }
    }
  },
  'curl': {
    desc: {
      eng: 'Client URL: Transfers data to or from network servers using supported protocols.',
      ara: 'نقل بيانات: يرسل ويستقبل البيانات من خوادم الويب وهو ممتاز لاختبار صفحات الويب وقواعد البيانات.'
    },
    flags: {
      '-O': { eng: 'Save output: writes output to a local file with remote name.', ara: 'حفظ الملف: يحمل الملف ويحفظه بنفس اسمه الأصلي.' },
      '-o': { eng: 'Custom save: writes output to a local file with custom name.', ara: 'حفظ باسم: يحفظ النتيجة أو الملف باسم مخصص.' },
      '-I': { eng: 'Headers: displays HTTP response header information only.', ara: 'رأس الصفحة: يستعرض معلومات رأس الصفحة (Headers) للخادم فقط دون محتواه.' }
    }
  },
  'ping': {
    desc: {
      eng: 'Ping: Sends packets to network hosts to check connection and response delays.',
      ara: 'فحص الاتصال: يفحص جودة وسرعة الاتصال مع خادم أو موقع معين.'
    },
    flags: {
      '-c': { eng: 'Count: stops after sending N packets.', ara: 'عدد المحاولات: يحدد إجمالي عدد حزم الفحص المرسلة قبل التوقف.' }
    }
  },
  'traceroute': {
    desc: {
      eng: 'Trace Route: Prints the route and hop counts packets take to network hosts.',
      ara: 'تتبع المسار: يعرض مسار الخوادم والموجهات التي تمر من خلالها البيانات للوصول للموقع.'
    },
    flags: {}
  },
  'ssh': {
    desc: {
      eng: 'Secure Shell: Opens secure encrypted terminal sessions to remote servers.',
      ara: 'الاتصال الآمن: يتيح تسجيل الدخول والتحكم الآمن في خوادم لينوكس البعيدة عبر الشبكة.'
    },
    flags: {
      '-p': { eng: 'Port: specifies port to connect to on the remote server.', ara: 'المنفذ: يحدد رقم منفذ الاتصال بالخادم البعيد (الافتراضي 22).' },
      '-i': { eng: 'Identity file: specifies the path of private key file for key-based authentication.', ara: 'مفتاح الهوية: يحدد مسار مفتاح التشفير الخاص لتسجيل الدخول دون كلمة مرور.' }
    }
  },
  'scp': {
    desc: {
      eng: 'Secure Copy: Copies files securely between network hosts over SSH protocol.',
      ara: 'النسخ الآمن: ينقل الملفات بشكل مشفر بين جهازك والجهاز البعيد باستخدام بروتوكول SSH.'
    },
    flags: {
      '-P': { eng: 'Port: specifies connection port on remote host.', ara: 'المنفذ: يحدد رقم منفذ الاتصال على الخادم البعيد.' },
      '-r': { eng: 'Recursive: copies entire directories recursively.', ara: 'نسخ متكرر: ينسخ المجلد بكافة محتوياته الفرعية.' }
    }
  },
  'rsync': {
    desc: {
      eng: 'Remote Sync: Fast, versatile remote file-copy and synchronization tool.',
      ara: 'مزامنة الملفات: أداة سريعة ومتقدمة لنسخ ومزامنة الملفات محلياً أو عن بعد.'
    },
    flags: {
      '-a': { eng: 'Archive mode: syncs recursively and preserves attributes.', ara: 'نمط الأرشيف: ينقل الملفات بكافة مستوياتها مع الحفاظ على الصلاحيات والروابط.' },
      '-z': { eng: 'Compress: compresses file data during transfer.', ara: 'ضغط البيانات: يضغط الملفات أثناء نقلها لتقليل استهلاك الإنترنت.' },
      '-v': { eng: 'Verbose: displays detailed progress info.', ara: 'توضيحي: يعرض أسماء وتفاصيل جميع الملفات أثناء نقلها.' }
    }
  },
  'ifconfig': {
    desc: {
      eng: 'Interface Config: Configures or displays active network interface parameters.',
      ara: 'إعدادات الشبكة: يعرض أو يضبط إعدادات كروت الشبكة وعناوين الـ IP.'
    },
    flags: {
      '-a': { eng: 'All: displays status of all interfaces, active or inactive.', ara: 'عرض الكل: يعرض كافة كروت الشبكة حتى المعطلة منها.' }
    }
  },
  'ip': {
    desc: {
      eng: 'IP Tool: Show / manipulate routing, network devices, interfaces and tunnels.',
      ara: 'أداة الآي بي: أداة حديثة وشاملة لاستعراض وإدارة كروت الشبكة وعناوين الـ IP والموجهات.'
    },
    flags: {
      'addr': { eng: 'Address: shows protocol addresses on active interfaces.', ara: 'العناوين: يعرض عناوين الـ IP المرتبطة بكروت الشبكة.' },
      'route': { eng: 'Route: shows routing table entries.', ara: 'التوجيه: يعرض جدول توجيه حزم البيانات في الشبكة.' }
    }
  },
  'netstat': {
    desc: {
      eng: 'Network Statistics: Displays network connections, routing tables, and interface statistics.',
      ara: 'إحصائيات الشبكة: يستعرض الاتصالات والمنافذ المفتوحة وجداول التوجيه.'
    },
    flags: {
      '-a': { eng: 'All: shows both listening and non-listening sockets.', ara: 'عرض الكل: يعرض كافة المنافذ المفتوحة والمستعدة للاتصال.' },
      '-t': { eng: 'TCP: shows TCP connections only.', ara: 'اتصالات TCP: يستعرض فقط الاتصالات من نوع TCP.' },
      '-u': { eng: 'UDP: shows UDP connections only.', ara: 'اتصالات UDP: يستعرض فقط الاتصالات من نوع UDP.' }
    }
  },
  'ss': {
    desc: {
      eng: 'Socket Statistics: Modern utility to investigate network sockets (faster netstat replacement).',
      ara: 'إحصائيات المقابس: يستعرض تفاصيل دقيقة عن المنافذ والاتصالات الجارية بسرعة وكفاءة عالية.'
    },
    flags: {
      '-t': { eng: 'TCP: displays TCP sockets.', ara: 'اتصالات TCP: يستعرض منافذ TCP فقط.' },
      '-u': { eng: 'UDP: displays UDP sockets.', ara: 'اتصالات UDP: يستعرض منافذ UDP فقط.' },
      '-l': { eng: 'Listening: displays only listening sockets.', ara: 'المستمعة: يستعرض المنافذ المستعدة لاستقبال اتصالات جديدة.' }
    }
  },
  'lsof': {
    desc: {
      eng: 'List Open Files: Lists information about files opened by processes (including network sockets).',
      ara: 'الملفات المفتوحة: يسرد قائمة بالملفات والمنافذ المفتوحة حالياً من قبل جميع البرامج.'
    },
    flags: {
      '-i': { eng: 'Internet: lists open internet/network socket connections.', ara: 'اتصالات الإنترنت: يعرض فقط منافذ الشبكة والإنترنت المفتوحة.' }
    }
  },

  // 10. Archive & Compression
  'tar': {
    desc: {
      eng: 'Tape Archiver: Saves multiple files into a single archive (tarball), and handles compression.',
      ara: 'أرشيف التار: يجمع عدة ملفات داخل ملف أرشيف واحد كبير، ويقوم بضغطها أو فكها.'
    },
    flags: {
      '-c': { eng: 'Create: creates a new archive file.', ara: 'إنشاء: ينشئ ملف أرشيف جديد.' },
      '-x': { eng: 'Extract: extracts files from an existing archive.', ara: 'استخراج: يفك ضغط ويستخرج محتويات ملف الأرشيف.' },
      '-v': { eng: 'Verbose: lists files processed during archive operations.', ara: 'توضيحي: يعرض أسماء الملفات التي يتم التعامل معها في الأرشيف.' },
      '-f': { eng: 'File: specifies the archive filename.', ara: 'اسم الأرشيف: يحدد اسم ملف الأرشيف المستهدف.' },
      '-z': { eng: 'Gzip: filters the archive through gzip compression.', ara: 'ضغط Gzip: يقوم بضغط أو فك ضغط الأرشيف بصيغة gzip.' }
    }
  },
  'gzip': {
    desc: {
      eng: 'Gzip: Compresses files using Lempel-Ziv coding (creates .gz files).',
      ara: 'ضغط جيزيب: يضغط الملفات ويقلل مساحتها وينتج ملفات بصيغة .gz.'
    },
    flags: {
      '-d': { eng: 'Decompress: decompresses the compressed files.', ara: 'فك الضغط: يفك ضغط الملفات المستهدفة.' }
    }
  },
  'zip': {
    desc: {
      eng: 'Zip: Packages and compresses files into .zip archives.',
      ara: 'ضغط زيب: يضغط ويجمع الملفات داخل ملف أرشيف بصيغة .zip الشهيرة.'
    },
    flags: {
      '-r': { eng: 'Recursive: packages directories recursively.', ara: 'نسخ متكرر: يضغط المجلد بكافة محتوياته المجلدات والملفات الفرعية.' }
    }
  },
  'unzip': {
    desc: {
      eng: 'Unzip: Extracts compressed files from ZIP archives.',
      ara: 'فك ضغط زيب: يستخرج ويفك ضغط الملفات المضغوطة بصيغة .zip.'
    },
    flags: {
      '-d': { eng: 'Directory: specifies the target directory to extract files into.', ara: 'المجلد المستهدف: يحدد المجلد الذي سيتم استخراج الملفات بداخله.' }
    }
  },

  // 11. Core Shell Commands
  'su': {
    desc: {
      eng: 'Substitute User: Switches active terminal session user to another user account.',
      ara: 'تبديل المستخدم: يتيح تبديل الجلسة الحالية والتحول لحساب مستخدم آخر.'
    },
    flags: {
      '-': { eng: 'Login shell: starts the shell as a login shell (sets environment variables).', ara: 'بيئة كاملة: يغير المستخدم ويفعل بيئة العمل الكاملة ومجلد المنزل الخاص به.' }
    }
  },
  'sudo': {
    desc: {
      eng: 'Superuser Do: Executes commands with root/administrator privileges.',
      ara: 'تنفيذ كمسؤول: ينفذ الأمر المكتوب بصلاحيات المسؤول الأعلى (root).'
    },
    flags: {
      '-i': { eng: 'Interactive: starts an interactive root login shell.', ara: 'مفسر المسؤول: يفتح بيئة عمل تفاعلية كمسؤول مباشرة.' }
    }
  },
  'whoami': {
    desc: { eng: 'Who Am I: Prints the username associated with the current terminal session.', ara: 'من أنا: يعرض اسم المستخدم النشط حالياً في جلسة الطرفية.' },
    flags: {}
  },
  'who': {
    desc: { eng: 'Who: Displays a list of users currently logged into the system.', ara: 'المتصلون حالياً: يعرض قائمة بالمستخدمين الذين سجلوا دخولهم للنظام.' },
    flags: {}
  },
  'w': {
    desc: { eng: 'W: Shows who is logged on and what they are currently doing.', ara: 'المستخدمون والمهام: يعرض المستخدمين المتصلين حالياً والعمليات التي ينفذونها.' },
    flags: {}
  },
  'id': {
    desc: { eng: 'ID: Prints real and effective user ID (UID) and group IDs (GID).', ara: 'الهوية: يعرض أرقام المعرف الفريد للمستخدم (UID) والمجموعات التي ينتمي إليها.' },
    flags: {}
  },
  'last': {
    desc: { eng: 'Last: Displays a list of last logged in users.', ara: 'الدخول الأخير: يستعرض قائمة بجميع عمليات تسجيل الدخول الأخيرة للنظام.' },
    flags: {}
  },
  'history': {
    desc: { eng: 'History: Lists previously executed commands in this session.', ara: 'سجل الأوامر: يعرض قائمة بالأوامر التي تم تنفيذها مسبقاً في الطرفية.' },
    flags: {}
  },
  'clear': {
    desc: { eng: 'Clear: Clears the terminal screen buffer.', ara: 'مسح الشاشة: ينظف شاشة الطرفية من السطور والأوامر السابقة.' },
    flags: {}
  },
  'exit': {
    desc: { eng: 'Exit: Closes the current terminal shell session.', ara: 'خروج: ينهي ويغلق جلسة الطرفية المفتوحة حالياً.' },
    flags: {}
  },
  'shutdown': {
    desc: {
      eng: 'Shutdown: Brings the system down safely.',
      ara: 'إيقاف التشغيل: يوقف إقلاع النظام ويغلق الكمبيوتر بأمان.'
    },
    flags: {
      '-h': { eng: 'Halt: powers off the machine.', ara: 'إغلاق كامل: يوقف النظام تماماً ويغلق الطاقة.' },
      '-r': { eng: 'Reboot: reboots the system.', ara: 'إعادة تشغيل: يعيد تشغيل الجهاز.' }
    }
  },
  'reboot': {
    desc: { eng: 'Reboot: Restarts the system immediately.', ara: 'إعادة تشغيل: يعيد تشغيل الجهاز فوراً.' },
    flags: {}
  },
  'poweroff': {
    desc: { eng: 'Poweroff: Shuts down and powers off the hardware immediately.', ara: 'إغلاق الطاقة: يوقف تشغيل النظام ويفصل الطاقة الكهربائية عن الجهاز.' },
    flags: {}
  },
  'halt': {
    desc: { eng: 'Halt: Stops the CPU execution immediately.', ara: 'إيقاف المعالج: يوقف نشاط المعالج فوراً دون فصل الطاقة.' },
    flags: {}
  },
  'init': {
    desc: { eng: 'Initialize: System V initialization control (switches runlevels).', ara: 'تشغيل النظام: يغير مستوى تشغيل النظام (Runlevel) مثل التحول للمستوى الرسومي أو الأحادي.' },
    flags: {}
  },
  'echo': {
    desc: { eng: 'Echo: Displays a line of text or prints shell variable values.', ara: 'طباعة نص: يعرض النص المكتوب أمامه في الطرفية أو يطبع قيم المتغيرات.' },
    flags: {
      '-n': { eng: 'No newline: do not output trailing newline.', ara: 'دون سطر جديد: يطبع النص مباشرة دون الانتقال لسطر جديد.' }
    }
  },
  'printf': {
    desc: { eng: 'Print Formatted: Formats and prints data text (more features than echo).', ara: 'طباعة منسقة: يعرض النصوص وينسقها بمميزات ومرونة أعلى من echo.' },
    flags: {}
  },
  'env': {
    desc: { eng: 'Environment: Displays environmental variables or executes program in customized environment.', ara: 'متغيرات البيئة: يعرض جميع متغيرات بيئة النظام الحالية.' },
    flags: {}
  },
  'export': {
    desc: { eng: 'Export: Passes environment variables from parent shell to child shells.', ara: 'تصدير: يجعل متغيرات البيئة المحلية متاحة للبرامج الفرعية والعمليات الجارية.' },
    flags: {}
  },
  'alias': {
    desc: { eng: 'Alias: Defines command shortcuts or custom commands.', ara: 'اسم مستعار: ينشئ اختصارات مخصصة للأوامر الطويلة.' },
    flags: {}
  },
  'unalias': {
    desc: { eng: 'Unalias: Removes defined command aliases.', ara: 'حذف الاختصار: يحذف الأسماء المستعارة والاختصارات التي تم تعريفها.' },
    flags: {}
  },
  'chroot': {
    desc: { eng: 'Change Root: Run command or interactive shell with special root directory.', ara: 'تغيير الجذر: يشغل الطرفية أو برنامجاً معتبراً مجلداً فرعياً كجذر أساسي للنظام لأسباب أمنية أو للصيانة.' },
    flags: {}
  },

  // 12. Helper Utilities & System Config
  'chgroup': {
    desc: { eng: 'Change Group: Changes group ownership of files.', ara: 'تغيير المجموعة: يغير المجموعة المالكة للملفات أو المجلدات.' },
    flags: {}
  },
  'chroot': {
    desc: { eng: 'Change Root: Runs command with special root directory.', ara: 'تغيير الجذر: يشغل أمراً ما مع اعتبار مجلد معين كأنه مجلد النظام الأساسي (الجذر).' },
    flags: {}
  },
  'stat': {
    desc: { eng: 'Status: Displays detailed file or filesystem status information.', ara: 'حالة الملف: يعرض معلومات كاملة ومفصلة عن الملف وصلاحياته وطوابعه الزمنية.' },
    flags: {}
  },
  'which': {
    desc: { eng: 'Which: Locates the executable binary file of a command.', ara: 'مسار البرنامج: يعرض المسار الكامل للملف التنفيذي الخاص بالأمر المبحوث عنه.' },
    flags: {}
  },
  'whereis': {
    desc: { eng: 'Where Is: Locates binary, source, and manual page files for commands.', ara: 'أين البرنامج: يبحث ويعرض مسارات الملفات التنفيذية والكتيبات البرمجية للأمر.' },
    flags: {}
  },
  'whatis': {
    desc: { eng: 'What Is: Displays single-line manual page descriptions for commands.', ara: 'تعريف الأمر: يعرض وصفاً مختصراً في سطر واحد لوظيفة الأمر المبحوث عنه.' },
    flags: {}
  },
  'man': {
    desc: { eng: 'Manual: Formats and displays the on-line manual pages for commands.', ara: 'كتيب التعليمات: يفتح الكتيب الرسمي للأمر المكتوب لاستعراض وظائفه وخياراته بالتفصيل.' },
    flags: {}
  },
  'info': {
    desc: { eng: 'Info: Reads multi-page documentation for commands.', ara: 'معلومات تفصيلية: يعرض كتيب معلومات تفصيلي وبشكل متفرع للأمر.' },
    flags: {}
  },
  'top': {
    desc: { eng: 'Top: Dynamic process viewer showing CPU and Memory usage.', ara: 'مراقب النظام: يعرض العمليات النشطة واستهلاك المعالج والذاكرة بشكل حي ومستمر.' },
    flags: {}
  },
  'killall': {
    desc: { eng: 'Killall: Kills processes by name.', ara: 'إنهاء بالاسم: يغلق جميع العمليات النشطة التي تطابق الاسم المدخل.' },
    flags: {}
  },
  'watch': {
    desc: { eng: 'Watch: Runs program periodically, showing output fullscreen.', ara: 'مراقبة التنفيذ: ينفذ أمراً بشكل دوري ومستمر (مثلاً كل ثانيتين) لمراقبة تحديث نتيجته.' },
    flags: {
      '-n': { eng: 'Interval: specifies execution interval in seconds.', ara: 'الفترة الزمنية: يحدد الفاصل الزمني بالثواني بين كل عملية تنفيذ.' }
    }
  },
  'sleep': {
    desc: { eng: 'Sleep: Delays execution for a specified amount of time.', ara: 'إيقاف مؤقت: يؤخر تنفيذ الخطوة التالية لفترة زمنية محددة بالثواني.' },
    flags: {}
  },
  'tar': {
    desc: { eng: 'Tar: Archive utility.', ara: 'أرشيف تار: يجمع ويضغط الملفات أو يفك ضغط الأرشيف.' },
    flags: {}
  },
  'zip': {
    desc: { eng: 'Zip: Compression utility.', ara: 'ضغط زيب: يضغط ويجمع ملفات في أرشيف zip.' },
    flags: {}
  },
  'unzip': {
    desc: { eng: 'Unzip: Decompression utility.', ara: 'فك زيب: يفك ضغط ملفات zip.' },
    flags: {}
  },
  'sed': {
    desc: { eng: 'Sed: Stream editor.', ara: 'محرر النصوص المتدفق: يستبدل ويعدل النصوص داخل الملفات.' },
    flags: {}
  },
  'awk': {
    desc: { eng: 'Awk: Pattern scanning utility.', ara: 'أوك: لغة معالجة نصوص ممتازة للأعمدة والبيانات.' },
    flags: {}
  },
  'lsof': {
    desc: { eng: 'Lsof: List open files.', ara: 'الملفات المفتوحة: يعرض قائمة بجميع الملفات والشبكات المفتوحة بالنظام حالياً.' },
    flags: {}
  },
  'netstat': {
    desc: { eng: 'Netstat: Network statistics.', ara: 'إحصائيات الشبكة: يستعرض الاتصالات والمنافذ وجداول التوجيه النشطة.' },
    flags: {}
  },
  'ss': {
    desc: { eng: 'Ss: Socket statistics.', ara: 'إحصائيات المقابس: يستعرض تفاصيل دقيقة عن المنافذ والاتصالات الجارية بسرعة.' },
    flags: {}
  },
  'ping': {
    desc: { eng: 'Ping: Check network connection.', ara: 'فحص الاتصال: يرسل حزم بيانات للتأكد من جودة الاتصال مع الخادم.' },
    flags: {}
  },
  'ifconfig': {
    desc: { eng: 'Ifconfig: Interface configuration.', ara: 'إعدادات الشبكة: يستعرض أو يضبط إعدادات كروت الشبكة والـ IP.' },
    flags: {}
  },
  'ip': {
    desc: { eng: 'Ip: IP routing and address tool.', ara: 'أداة الآي بي: يعرض ويدير كروت الشبكة وعناوين الـ IP والتوجيه.' },
    flags: {}
  },
  'traceroute': {
    desc: { eng: 'Traceroute: Trace network route.', ara: 'تتبع المسار: يعرض خوادم الإنترنت التي تمر من خلالها حزم البيانات.' },
    flags: {}
  },
  'curl': {
    desc: { eng: 'Curl: Transfer data from/to server.', ara: 'نقل بيانات كيرل: ينقل البيانات من وإلى الخوادم ويدعم تحميل الملفات.' },
    flags: {}
  },
  'wget': {
    desc: { eng: 'Wget: Network file downloader.', ara: 'تحميل ويب: يحمل ملفات من الإنترنت مباشرة من خلال الرابط.' },
    flags: {}
  },
  'ssh': {
    desc: { eng: 'Ssh: Secure shell client.', ara: 'الاتصال الآمن: يفتح طرفية مشفرة وآمنة للتحكم بخادم بعيد.' },
    flags: {}
  },
  'scp': {
    desc: { eng: 'Scp: Secure copy client.', ara: 'النسخ الآمن: ينسخ ملفات بين جهازك وخادم بعيد بشكل مشفر.' },
    flags: {}
  },
  'rsync': {
    desc: { eng: 'Rsync: Remote file sync utility.', ara: 'مزامنة ريسنك: ينسخ ويزامن الملفات والمجلدات بكفاءة وسرعة عالية.' },
    flags: {}
  },
  'df': {
    desc: { eng: 'Df: Disk free space report.', ara: 'مساحة القرص: يستعرض المساحة المستهلكة والحرة على وحدات التخزين.' },
    flags: {}
  },
  'du': {
    desc: { eng: 'Du: Disk usage report.', ara: 'استهلاك المساحة: يقدر ويحسب حجم استهلاك المساحة للملفات والمجلدات.' },
    flags: {}
  },
  'free': {
    desc: { eng: 'Free: Memory usage report.', ara: 'الذاكرة الحرة: يعرض حجم الذاكرة العشوائية (RAM) الحرة والمستهلكة.' },
    flags: {}
  },
  'uptime': {
    desc: { eng: 'Uptime: System uptime report.', ara: 'مدة التشغيل: يعرض مدة عمل الجهاز الحالية دون إغلاق وضغط النظام.' },
    flags: {}
  },
  'dmesg': {
    desc: { eng: 'Dmesg: Kernel ring buffer log.', ara: 'سجلات النواة: يستعرض رسائل إقلاع النظام وتفاعل العتاد مع النواة.' },
    flags: {}
  },
  'lspci': {
    desc: { eng: 'Lspci: List PCI devices.', ara: 'أجهزة PCI: يسرد كافة الأجهزة المتصلة بمدخل PCI ككروت الشاشة.' },
    flags: {}
  },
  'lsusb': {
    desc: { eng: 'Lsusb: List USB devices.', ara: 'أجهزة USB: يسرد منافذ وأجهزة الـ USB المتصلة بجهازك.' },
    flags: {}
  },
  'fdisk': {
    desc: { eng: 'Fdisk: Partition manipulator.', ara: 'تقسيم القرص: يستعرض ويتحكم ببارتشنات وأقسام وحدات التخزين.' },
    flags: {}
  },
  'parted': {
    desc: { eng: 'Parted: Partitioning utility.', ara: 'محرر أقسام متطور: برنامج متطور لتقسيم وتكبير مساحات الأقراص الصلبة.' },
    flags: {}
  },
  'blkid': {
    desc: { eng: 'Blkid: Block attributes list.', ara: 'معرف الأقراص: يعرض المعرف الفريد ونوع ملفات كل بارتشن بالقرص.' },
    flags: {}
  },
  'dd': {
    desc: { eng: 'Dd: Convert and copy.', ara: 'نسخ الأقراص: ينسخ البيانات الخام من قرص لآخر (لإنشاء فلاشة نظام التشغيل).' },
    flags: {}
  },
  'useradd': {
    desc: { eng: 'Useradd: Create user account.', ara: 'إنشاء مستخدم: يُنشئ مستخدماً جديداً بالنظام.' },
    flags: {}
  },
  'usermod': {
    desc: { eng: 'Usermod: Modify user account.', ara: 'تعديل مستخدم: يُعدل خصائص وإعدادات حساب مستخدم موجود.' },
    flags: {}
  },
  'passwd': {
    desc: { eng: 'Passwd: Change user password.', ara: 'كلمة المرور: يغير كلمة المرور للمستخدم.' },
    flags: {}
  },
  'groupadd': {
    desc: { eng: 'Groupadd: Create user group.', ara: 'إنشاء مجموعة: يُنشئ مجموعة مستخدمين جديدة بالنظام.' },
    flags: {}
  },
  'userdel': {
    desc: { eng: 'Userdel: Delete user account.', ara: 'حذف مستخدم: يحذف حساب مستخدم من النظام.' },
    flags: {}
  },
  'groupdel': {
    desc: { eng: 'Groupdel: Delete user group.', ara: 'حذف مجموعة: يحذف مجموعة مستخدمين من النظام.' },
    flags: {}
  },
  'groupmod': {
    desc: { eng: 'Groupmod: Modify group definition.', ara: 'تعديل مجموعة: يغير اسم أو معرف مجموعة مستخدمين.' },
    flags: {}
  },
  'grep': {
    desc: { eng: 'Grep: Search text pattern.', ara: 'بحث نصوص: يبحث عن نصوص معينة داخل الملفات.' },
    flags: {}
  },
  'find': {
    desc: { eng: 'Find: Find files recursively.', ara: 'البحث عن ملفات: يبحث عن ملفات ومجلدات حسب معايير معينة.' },
    flags: {}
  },
  'locate': {
    desc: { eng: 'Locate: Locate files by index.', ara: 'تحديد موقع: يبحث عن ملفات بسرعة باستخدام قاعدة بيانات الفهرس الجاهزة.' },
    flags: {}
  },
  'cut': {
    desc: { eng: 'Cut: Cut columns from file.', ara: 'قص النصوص: يقتطع أجزاء أو أعمدة محددة من كل سطر.' },
    flags: {}
  },
  'sort': {
    desc: { eng: 'Sort: Sort text lines.', ara: 'فرز: يرتب أسطر ملفات النصوص أبجدياً أو عددياً.' },
    flags: {}
  },
  'uniq': {
    desc: { eng: 'Uniq: Report duplicate lines.', ara: 'تصفية التكرار: يعرض السطور الفريدة أو يزيل التكرار المتتالي.' },
    flags: {}
  },
  'wc': {
    desc: { eng: 'Wc: Word and line count.', ara: 'عد الكلمات: يحسب عدد السطور، والكلمات، والأحرف في الملفات.' },
    flags: {}
  },
  'diff': {
    desc: { eng: 'Diff: Compare files line-by-line.', ara: 'مقارنة ملفات: يقارن ويعرض الاختلافات بين ملفين سطراً بسطر.' },
    flags: {}
  },
  'head': {
    desc: { eng: 'Head: Output starting lines.', ara: 'بداية الملف: يعرض السطور الأولى من الملف.' },
    flags: {}
  },
  'tail': {
    desc: { eng: 'Tail: Output ending lines.', ara: 'نهاية الملف: يعرض السطور الأخيرة من الملف.' },
    flags: {}
  },
  'less': {
    desc: { eng: 'Less: Paginate output viewing.', ara: 'عرض مقسم: يعرض محتويات الملف بشكل مقسم ومريح مع إمكانية التمرير.' },
    flags: {}
  },
  'more': {
    desc: { eng: 'More: Paginate output viewing.', ara: 'عرض صفحة بصفحة: يعرض محتويات الملف صفحة بصفحة (تمرير لأسفل فقط).' },
    flags: {}
  },
  'cat': {
    desc: { eng: 'Cat: Output file content.', ara: 'عرض ملف: يعرض محتويات الملف أو يدمج عدة ملفات.' },
    flags: {}
  },
  'vi': {
    desc: { eng: 'Vi: Text editor.', ara: 'في آي: محرر نصوص قوي متوفر افتراضياً في النظام.' },
    flags: {}
  },
  'nano': {
    desc: { eng: 'Nano: Text editor.', ara: 'نانو: محرر نصوص بسيط وسهل الاستخدام للمبتدئين.' },
    flags: {}
  },
  'ps': {
    desc: { eng: 'Ps: Snapshot process status.', ara: 'حالة العمليات: يعرض حالة العمليات النشطة بالنظام في هذه اللحظة.' },
    flags: {}
  },
  'kill': {
    desc: { eng: 'Kill: Terminate process by PID.', ara: 'إنهاء عملية: يغلق عملية معينة باستخدام رقم المعرف.' },
    flags: {}
  },
  'pgrep': {
    desc: { eng: 'Pgrep: Look up process PIDs by name.', ara: 'البحث عن عمليات: يبحث عن معرفات العمليات التي تطابق اسماً معيناً.' },
    flags: {}
  },
  'systemctl': {
    desc: { eng: 'Systemctl: Control systemd services.', ara: 'إدارة الخدمات: يشغل ويوقف خدمات النظام الأساسية.' },
    flags: {}
  },
  'journalctl': {
    desc: { eng: 'Journalctl: Query systemd journal.', ara: 'سجلات الخدمات: يستعرض ويفحص سجلات النظام والخدمات.' },
    flags: {}
  },
  'crontab': {
    desc: { eng: 'Crontab: Maintain task scheduling tables.', ara: 'جدولة مهام: يجدول تنفيذ الأوامر والمهام التلقائية بالوقت.' },
    flags: {}
  },
  'mount': {
    desc: { eng: 'Mount: Mount filesystem.', ara: 'ربط القرص: يربط القرص الصلب أو الفلاشة بمجلد محدد للوصول لملفاتها.' },
    flags: {}
  },
  'umount': {
    desc: { eng: 'Umount: Unmount filesystem.', ara: 'فصل القرص: يفصل القرص الصلب أو الفلاشة بأمان لضمان سلامة البيانات.' },
    flags: {}
  },
  'gzip': {
    desc: { eng: 'Gzip: Compress files.', ara: 'جيزيب: يضغط الملفات ويقلل مساحتها وينتج ملفات .gz.' },
    flags: {}
  },
  'screen': {
    desc: { eng: 'Screen: Terminal multiplexer.', ara: 'شاشة افتراضية: يقسم الطرفية لعدة جلسات مستقلة تعمل بالخلفية.' },
    flags: {}
  },
  'tmux': {
    desc: { eng: 'Tmux: Terminal multiplexer.', ara: 'مقسم طرفية: يتيح تقسيم الشاشة إلى لوحات متعددة مع حفظ الجلسات.' },
    flags: {}
  },
  'nohup': {
    desc: { eng: 'Nohup: Run command immune to hangups.', ara: 'لا قطع: يشغل أمراً يحميه من الانقطاع عند تسجيل الخروج أو إغلاق الطرفية.' },
    flags: {}
  },
  'whoami': {
    desc: { eng: 'Whoami: Print active user.', ara: 'من أنا: يعرض اسم المستخدم النشط حالياً في جلسة الطرفية.' },
    flags: {}
  },
  'who': {
    desc: { eng: 'Who: Print logged in users.', ara: 'المتصلون: يعرض قائمة بالمستخدمين الذين سجلوا دخولهم للنظام.' },
    flags: {}
  },
  'w': {
    desc: { eng: 'W: Print users and tasks.', ara: 'المستخدمون والمهام: يعرض المستخدمين المتصلين حالياً والعمليات التي ينفذونها.' },
    flags: {}
  },
  'id': {
    desc: { eng: 'Id: Print user and group ID details.', ara: 'الهوية: يعرض أرقام المعرف للمستخدم (UID) والمجموعات التي ينتمي إليها.' },
    flags: {}
  },
  'last': {
    desc: { eng: 'Last: Print last logged in users.', ara: 'الدخول الأخير: يستعرض قائمة بجميع عمليات تسجيل الدخول الأخيرة للنظام.' },
    flags: {}
  },
  'history': {
    desc: { eng: 'History: Print command history.', ara: 'سجل الأوامر: يعرض قائمة بالأوامر التي تم تنفيذها مسبقاً في الطرفية.' },
    flags: {}
  },
  'clear': {
    desc: { eng: 'Clear: Clear screen.', ara: 'مسح الشاشة: ينظف شاشة الطرفية من السطور والأوامر السابقة.' },
    flags: {}
  },
  'exit': {
    desc: { eng: 'Exit: Exit terminal session.', ara: 'خروج: ينهي ويغلق جلسة الطرفية المفتوحة حالياً.' },
    flags: {}
  },
  'shutdown': {
    desc: { eng: 'Shutdown: Turn off system.', ara: 'إيقاف التشغيل: يوقف إقلاع النظام ويغلق الكمبيوتر بأمان.' },
    flags: {}
  },
  'reboot': {
    desc: { eng: 'Reboot: Reboot system.', ara: 'إعادة تشغيل: يعيد تشغيل الجهاز فوراً.' },
    flags: {}
  },
  'poweroff': {
    desc: { eng: 'Poweroff: Poweroff system.', ara: 'إغلاق الطاقة: يوقف تشغيل النظام ويفصل الطاقة الكهربائية.' },
    flags: {}
  },
  'halt': {
    desc: { eng: 'Halt: Halt CPU activity.', ara: 'إيقاف المعالج: يوقف نشاط المعالج فوراً دون فصل الطاقة.' },
    flags: {}
  },
  'init': {
    desc: { eng: 'Init: Change system runlevel.', ara: 'تشغيل النظام: يغير مستوى تشغيل النظام (Runlevel).' },
    flags: {}
  },
  'echo': {
    desc: { eng: 'Echo: Output text.', ara: 'طباعة نص: يعرض النص المكتوب أمامه في الطرفية.' },
    flags: {}
  },
  'printf': {
    desc: { eng: 'Printf: Print formatted data.', ara: 'طباعة منسقة: يعرض النصوص وينسقها بمميزات ومرونة أعلى.' },
    flags: {}
  },
  'env': {
    desc: { eng: 'Env: Print environment variables.', ara: 'متغيرات البيئة: يعرض جميع متغيرات بيئة النظام الحالية.' },
    flags: {}
  },
  'export': {
    desc: { eng: 'Export: Export shell variable.', ara: 'تصدير: يجعل متغيرات البيئة المحلية متاحة للبرامج والعمليات الجارية.' },
    flags: {}
  },
  'alias': {
    desc: { eng: 'Alias: Create alias shortcut.', ara: 'اسم مستعار: ينشئ اختصارات مخصصة للأوامر الطويلة.' },
    flags: {}
  },
  'unalias': {
    desc: { eng: 'Unalias: Delete alias shortcut.', ara: 'حذف الاختصار: يحذف الأسماء المستعارة والاختصارات.' },
    flags: {}
  },
  'ln': {
    desc: { eng: 'Ln: Create link.', ara: 'إنشاء رابط: يُنشئ روابط صلبة أو رمزية بين الملفات.' },
    flags: {}
  },
  'file': {
    desc: { eng: 'File: Check file type.', ara: 'نوع الملف: يحدد نوع وصيغة الملفات المستهدفة.' },
    flags: {}
  }
};

function parseCommand(commandStr, lang = 'eng') {
  const cleanCmd = commandStr.trim().replace(/\s+/g, ' ');
  const parts = cleanCmd.split(' ');
  if (parts.length === 0 || parts[0] === '') return { tokens: [], explanations: [] };

  const baseCmd = parts[0];
  const tokens = [];
  const explanations = [];

  // 1. Base command token
  tokens.push({ text: baseCmd, type: 'command', colorClass: 'color-cmd' });

  const cmdEntry = DATABASE[baseCmd];
  const cmdDesc = cmdEntry ? cmdEntry.desc[lang] : TRANSLATIONS[lang].fallbackCmd;
  explanations.push({ name: baseCmd, type: 'command', desc: cmdDesc, colorClass: 'color-cmd' });

  // 2. Process arguments and options
  for (let i = 1; i < parts.length; i++) {
    const part = parts[i];
    if (part.startsWith('-')) {
      // Flag token
      tokens.push({ text: part, type: 'flag', colorClass: 'color-flag' });

      let flagDesc = '';
      if (cmdEntry && cmdEntry.flags) {
        if (cmdEntry.flags[part]) {
          flagDesc = cmdEntry.flags[part][lang];
        } else {
          // Decompose composite flags (e.g. -la, -rf)
          const cleanFlag = part.startsWith('--') ? [part] : part.slice(1).split('').map(c => `-${c}`);
          let items = [];
          cleanFlag.forEach(f => {
            if (cmdEntry.flags && cmdEntry.flags[f]) {
              items.push(`<code>${f}</code>: ${cmdEntry.flags[f][lang]}`);
            } else {
              items.push(`<code>${f}</code>: ${lang === 'ara' ? 'خيار مخصص أو غير معروف.' : 'Custom or composite option flag.'}`);
            }
          });
          flagDesc = `${TRANSLATIONS[lang].multiFlagHeader}<ul class="${lang === 'ara' ? 'mr-5' : 'ml-5'} mt-1 list-disc"><li>${items.join('</li><li>')}</li></ul>`;
        }
      } else {
        flagDesc = TRANSLATIONS[lang].fallbackFlag;
      }

      explanations.push({ name: part, type: 'flag', desc: flagDesc, colorClass: 'color-flag' });
    } else {
      // Argument token
      tokens.push({ text: part, type: 'argument', colorClass: 'color-arg' });

      let argDesc = TRANSLATIONS[lang].fallbackArg;
      if (baseCmd === 'tar' && part.includes('.tar')) {
        argDesc = TRANSLATIONS[lang].archiveFile;
      } else if (part.startsWith('/') || part.includes('/') || part === 'project/src' || part === '/home/user' || part === '/tmp/scratch') {
        argDesc = TRANSLATIONS[lang].targetPath;
      }

      explanations.push({ name: part, type: 'argument', desc: argDesc, colorClass: 'color-arg' });
    }
  }

  return { tokens, explanations };
}

// Export module for Node.js tests or assign global for browser use
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { parseCommand, DATABASE, TRANSLATIONS };
} else if (typeof window !== 'undefined') {
  window.ShellScoutParser = { parseCommand, DATABASE, TRANSLATIONS };
}
