# 🚨 MISSING SANITY CONTENT - SOLUTION GUIDE

## Problem Summary

You're seeing content on your website that you **can't find in Sanity Studio**. Here's why:

---

## 🔍 What's Missing and Why

### 1. ❌ "Staatliche Agenten" Case Study Section

**Location on site:** Home page, below the testimonial  
**Current status:** ⚠️ **HARDCODED** - Not managed by Sanity at all!  
**File:** `src/app/features/home/components/case-study/case-study.component.html`

**Hardcoded content includes:**

- Badge: "Kanton Wallis"
- Title: "Staatliche Agenten"
- Description: "70% der Arbeit automatisiert..."
- Stats: 70%, 45%, 3x
- Link: "/case-study/staatliche-agenten"

**Why you can't find it:** It's static HTML, not Sanity data.

---

### 2. ❌ Testimonial: "Endlich jemand, der nicht nur Technik verkauft..."

**Location on site:** Home page, above case study section  
**Current status:** ⚠️ **Missing Sanity Document**  
**Expected:** Should be a "Testimonial" document with `featured = true`

**What's needed:**

- Document type: `testimonial`
- Fields:
  - `clientName`: "Danièle Bovier"
  - `clientRole`: "Kommunikation, Kanton Wallis" (localized)
  - `quote`: "Endlich jemand, der nicht nur Technik verkauft..." (localized)
  - `featured`: true
  - `order`: 1

**Why you can't find it:** The Testimonial document hasn't been created yet in Sanity.

---

## 📋 Complete List of Required Sanity Document Types

Based on your Angular app, you need these document types in Sanity:

### Core Page Documents (Singletons)

1. ✅ **homePage** - Single document
2. ✅ **aboutPage** - Single document
3. ✅ **productPage** - Single document
4. ✅ **contactPage** - Single document

### Collection Documents (Multiple)

5. ❓ **testimonial** - Multiple documents (check if exists)
6. ❓ **caseStudy** - Multiple documents (check if exists)
7. ❓ **partner** - Multiple documents for logo carousel (check if exists)
8. ❓ **career** - Multiple documents for job positions (check if exists)
9. ❓ **teamMember** - Multiple documents for team page (check if exists)

### Site Settings

10. ❓ **siteSettings** - Single document for global settings

---

## 🔧 How to Check What's Missing in Sanity Studio

### Step 1: Open Sanity Studio

Go to: https://aintegrator.sanity.studio (or your sanity studio URL)

### Step 2: Check Your Content Types

In the left sidebar, you should see these sections:

- ☑️ Home Page
- ☑️ About Page
- ☑️ Product Page
- ☑️ Contact Page
- ☑️ **Testimonials** ← CHECK THIS
- ☑️ **Case Studies** ← CHECK THIS
- ☑️ **Partners** ← CHECK THIS
- ☑️ **Career Positions** ← CHECK THIS
- ☑️ **Team Members** ← CHECK THIS
- ☑️ Site Settings

### Step 3: Check Home Page Fields

Open "Home Page" in Sanity Studio and verify you see ALL these fields:

#### Hero Section

- ✓ Hero Title (EN, DE, FR, IT)
- ✓ Hero Description (EN, DE, FR, IT)
- ✓ Hero Show Button (checkbox)
- ✓ Hero Button Label (EN, DE, FR, IT)

#### CTA Card Section

- ✓ CTA Card Title (EN, DE, FR, IT)
- ✓ CTA Card Description (EN, DE, FR, IT)
- ✓ CTA Card Link Text (EN, DE, FR, IT)
- ✓ CTA Card Link URL (string)

#### Partners Section

- ✓ Partners (array of Partner references)

#### Process Steps Section

- ✓ Process Steps Title (EN, DE, FR, IT)
- ✓ Process Steps (array):
  - Number (string)
  - Title (EN, DE, FR, IT)
  - Description (EN, DE, FR, IT)
  - Active (checkbox)

#### Security Card Section

- ✓ Security Card Title (EN, DE, FR, IT)
- ✓ Security Card Description (EN, DE, FR, IT)

#### Final CTA Section

- ✓ Final CTA Title (EN, DE, FR, IT)
- ✓ Final CTA Description (EN, DE, FR, IT)
- ✓ Final CTA Primary Button Text (EN, DE, FR, IT)
- ✓ Final CTA Primary Button Link (string)
- ✓ Final CTA Secondary Button Text (EN, DE, FR, IT)
- ✓ Final CTA Secondary Button Link (string)

---

## 🛠️ Solution Options

### Option A: Quick Fix (Recommended for Now)

**Keep case study hardcoded, just add testimonials**

1. Create Testimonial document type in Sanity (if missing)
2. Add the testimonial content
3. Done! Everything else works.

### Option B: Full Sanity Migration (Better Long-term)

**Move case study to Sanity for easy editing**

1. Add case study fields to HomePage schema:

   ```typescript
   {
     name: 'featuredCaseStudy',
     title: 'Featured Case Study',
     type: 'object',
     fields: [
       {
         name: 'badge',
         title: 'Badge Text',
         type: 'object',
         fields: [
           { name: 'en', type: 'string' },
           { name: 'de', type: 'string' },
           { name: 'fr', type: 'string' },
           { name: 'it', type: 'string' }
         ]
       },
       {
         name: 'title',
         title: 'Title',
         type: 'object',
         fields: [
           { name: 'en', type: 'string' },
           { name: 'de', type: 'string' },
           { name: 'fr', type: 'string' },
           { name: 'it', type: 'string' }
         ]
       },
       {
         name: 'description',
         title: 'Description',
         type: 'object',
         fields: [
           { name: 'en', type: 'text' },
           { name: 'de', type: 'text' },
           { name: 'fr', type: 'text' },
           { name: 'it', type: 'text' }
         ]
       },
       {
         name: 'stats',
         title: 'Statistics',
         type: 'array',
         of: [{
           type: 'object',
           fields: [
             { name: 'value', type: 'string', title: 'Value' },
             { name: 'suffix', type: 'string', title: 'Suffix' },
             {
               name: 'description',
               type: 'object',
               title: 'Description',
               fields: [
                 { name: 'en', type: 'string' },
                 { name: 'de', type: 'string' },
                 { name: 'fr', type: 'string' },
                 { name: 'it', type: 'string' }
               ]
             }
           ]
         }]
       },
       { name: 'link', type: 'string', title: 'Case Study Link' }
     ]
   }
   ```

2. Update Angular HomePage interface
3. Update case-study.component.ts to fetch from Sanity
4. Update template to use dynamic data

---

## 📝 Sanity Schema Files Checklist

If you're managing Sanity schemas in code, you need these files:

```
sanity-studio/
├── schemas/
│   ├── documents/
│   │   ├── homePage.ts         ✅ (verify fields)
│   │   ├── aboutPage.ts        ✅ (verify fields)
│   │   ├── productPage.ts      ✅ (verify fields)
│   │   ├── contactPage.ts      ✅ (verify fields)
│   │   ├── testimonial.ts      ❓ (check if exists)
│   │   ├── caseStudy.ts        ❓ (check if exists)
│   │   ├── partner.ts          ❓ (check if exists)
│   │   ├── career.ts           ❓ (check if exists)
│   │   ├── teamMember.ts       ❓ (check if exists)
│   │   └── siteSettings.ts     ❓ (check if exists)
│   └── index.ts
└── sanity.config.ts
```

---

## 🎯 Immediate Action Steps

### Step 1: Verify What You Have

```bash
# Log into Sanity Studio
# Check sidebar for all document types
# Open Home Page and list all visible fields
```

### Step 2: Create Missing Document Types

If "Testimonials" section is missing:

1. You need to add testimonial schema to Sanity
2. Create the testimonial document
3. Populate with Danièle Bovier testimonial

If "Case Studies" section is missing:

1. Either keep it hardcoded (easiest)
2. Or add case study schema + migrate to Sanity

### Step 3: Compare Fields

- Open your Home Page in Sanity Studio
- Take a screenshot of all available fields
- Compare with the checklist above
- Report which fields are missing

### Step 4: Get Help

If you don't have access to modify Sanity schemas:

- You need access to the Sanity project dashboard
- Or you need the schema files repository
- Contact your Sanity project admin

---

## ❓ FAQ

**Q: Why can't I edit "Staatliche Agenten" in Sanity?**  
A: It's hardcoded HTML, not Sanity content. See Option B above to migrate it.

**Q: Where is my Sanity studio code?**  
A: Could be in a separate repo, or managed through Sanity cloud. Check with your team.

**Q: How do I add new schema types?**  
A: You need access to sanity.config.ts file and schema definitions. Then deploy with `sanity deploy`.

**Q: Can I just add content without changing schemas?**  
A: Only if the document type already exists. You can create new documents of existing types.

---

## 📞 Next Steps

Reply with:

1. Screenshot of your Sanity Studio sidebar (showing all content types)
2. Screenshot of your Home Page fields in Sanity
3. Which option you prefer (A or B)
4. Whether you have access to Sanity schema files

I'll help you implement the solution based on your setup!
