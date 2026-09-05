import React, { useEffect, useState } from 'react'
import { Link, Navigate, useLocation, useNavigate, useParams } from 'react-router-dom'

const traineeData = {
  dashboard: { eyebrow: 'Monday, 04 September 2026', title: 'Welcome back, Aarav', intro: 'Here is what is happening with your employment journey.', action: ['View profile', '/trainee/profile'] },
  training: { eyebrow: 'Learning centre', title: 'My Training', intro: 'Track your learning path, milestones and certificates.', action: ['Browse courses', '/trainee/training'] },
  jobs: { eyebrow: 'Career marketplace', title: 'Job Opportunities', intro: 'Discover roles matched to your skills, goals and training.', action: ['View applications', '/trainee/applications'] },
  applications: { eyebrow: 'Career journey', title: 'Applications', intro: 'Follow every opportunity from application to outcome.', action: ['Find opportunities', '/trainee/jobs'] },
  employment: { eyebrow: 'Career journey', title: 'Employment Status', intro: 'Your current placement details and next steps.', action: ['Update status', '/trainee/employment'] },
  history: { eyebrow: 'Career journey', title: 'Employment History', intro: 'A clear record of your work and placement milestones.', action: ['Add experience', '/trainee/history'] },
  profile: { eyebrow: 'Account settings', title: 'My Profile', intro: 'Keep your personal and professional details up to date.', action: ['Edit profile', '/trainee/profile'] },
}

const officerData = {
  dashboard: { eyebrow: 'Monday, 04 September 2026', title: 'Welcome back, Gov Officer', intro: 'A live pulse on employment outcomes across your programme.', action: ['Export report', '/gov-officer/reports-insights'] },
  trainees: { eyebrow: 'Programme directory', title: 'Trainees', intro: 'Monitor training progress and employment outcomes across the cohort.', action: ['Export directory', '/gov-officer/trainees'] },
  centers: { eyebrow: 'Programme network', title: 'Training Centers', intro: 'Compare partner performance and keep delivery on track.', action: ['Add center', '/gov-officer/centers'] },
  'trainee-detail': { eyebrow: 'Programme directory', title: 'Trainee details', intro: 'Review a complete training and placement record.', action: ['Back to trainees', '/gov-officer/trainees'] },
  'employer-detail': { eyebrow: 'Employer network', title: 'Company details', intro: 'Review hiring activity and partnership information.', action: ['Back to employers', '/gov-officer/employers'] },
  employers: { eyebrow: 'Employer network', title: 'Employers', intro: 'Build stronger pathways from training to meaningful work.', action: ['Add employer', '/gov-officer/employers'] },
  placements: { eyebrow: 'Outcome operations', title: 'Placements', intro: 'Review recent placements and close the loop on outcomes.', action: ['Record placement', '/gov-officer/placements'] },
  'reports-insights': { eyebrow: 'Programme intelligence', title: 'Reports & Insights', intro: 'Turn outcome data into decisions your team can act on.', action: ['Generate report', '/gov-officer/reports-insights'] },
}

const traineeActivity = [['Today', 'Completed “Interview essentials”', 'Learning milestone', 'teal'], ['02 Sep', 'Profile viewed by TCS Careers', 'Employer activity', 'blue'], ['28 Aug', 'Application moved to interview', 'Placement update', 'amber']]
const placements = [['Priya Sharma', 'Data Analyst', 'Infosys', '₹42,000', 'Today'], ['Rahul Verma', 'Software Developer', 'HCLTech', '₹48,500', 'Yesterday'], ['Neha Singh', 'Customer Support Executive', 'Genpact', '₹31,000', '31 Aug']]
const beneficiaries = [['BEN-2048', 'Ananya Sharma', 'Digital Marketing', 'Government ITI Noida', 'Placed', 'teal'], ['BEN-2047', 'Rohan Verma', 'Data Analytics', 'Government ITI Ghaziabad', 'Interviewing', 'amber'], ['BEN-2046', 'Ishita Rao', 'Healthcare Support', 'Government ITI Lucknow', 'In training', 'blue'], ['BEN-2045', 'Kabir Singh', 'Retail Operations', 'Skill Development Center Agra', 'Placed', 'teal']]
const traineeRows = [['TR-2048', 'Ananya Sharma', 'Digital Marketing', 'Government ITI Noida', 'Active', 'Placed'], ['TR-2047', 'Rohan Verma', 'Data Analytics', 'Government ITI Ghaziabad', 'Active', 'Interviewing'], ['TR-2046', 'Ishita Rao', 'Healthcare Support', 'Government ITI Lucknow', 'Active', 'Not placed'], ['TR-2045', 'Kabir Singh', 'Retail Operations', 'Skill Development Center Agra', 'Completed', 'Placed'], ['TR-2044', 'Meera Nair', 'Web Development', 'Government ITI Aligarh', 'Active', 'Interviewing']]
const traineeDetails = {
  'TR-2048': { name: 'Ananya Sharma', id: 'TR-2048', program: 'Digital Marketing', center: 'Government ITI Noida', district: 'Noida', education: 'BBA, Delhi University', progress: 72, skills: 'SEO · Content strategy · Analytics', completion: 'In progress', employment: 'Employed', placement: 'Placed', company: 'TCS', role: 'Digital Marketing Executive', salary: '₹42,000 / month', history: 'TCS · Digital Marketing Executive · Sep 2026 – Present', performance: 'Strong · 86/100', relevance: 'High', applications: 'Offer accepted · Joined 06 Sep 2026' },
  'TR-2047': { name: 'Rohan Verma', id: 'TR-2047', program: 'Data Analytics', center: 'Government ITI Ghaziabad', district: 'Ghaziabad', education: 'BSc Statistics, CCS University', progress: 84, skills: 'Excel · SQL · Power BI', completion: 'Completed', employment: 'Seeking employment', placement: 'Interviewing', company: 'Infosys', role: 'Data Analyst candidate', salary: 'Expected ₹45,000 / month', history: 'No previous employment recorded', performance: 'Excellent · 91/100', relevance: 'High', applications: '2 interviews scheduled' },
  'TR-2046': { name: 'Ishita Rao', id: 'TR-2046', program: 'Healthcare Support', center: 'Government ITI Lucknow', district: 'Lucknow', education: 'BA, Lucknow University', progress: 54, skills: 'Patient care · Documentation · Communication', completion: 'In progress', employment: 'Unemployed', placement: 'Not placed', company: 'Not placed', role: 'Seeking healthcare support role', salary: 'Not available', history: 'No previous employment recorded', performance: 'Developing · 68/100', relevance: 'Pending placement', applications: '1 application · No interview yet' },
  'TR-2045': { name: 'Kabir Singh', id: 'TR-2045', program: 'Retail Operations', center: 'Skill Development Center Agra', district: 'Agra', progress: 100, skills: 'Customer service · Inventory · POS systems', completion: 'Completed', employment: 'Employed', placement: 'Placed', company: 'Genpact', role: 'Customer Support Executive', salary: '₹31,000 / month', history: 'Genpact · Customer Support Executive · Aug 2026 – Present', performance: 'Strong · 84/100', relevance: 'High', applications: 'Offer accepted · Joined 18 Aug 2026' },
  'TR-2044': { name: 'Meera Nair', id: 'TR-2044', program: 'Web Development', center: 'Government ITI Aligarh', district: 'Aligarh', progress: 66, skills: 'HTML · CSS · JavaScript', completion: 'In progress', employment: 'Seeking employment', placement: 'Interviewing', company: 'HCLTech', role: 'Web Developer candidate', salary: 'Expected ₹40,000 / month', history: 'No previous employment recorded', performance: 'Strong · 82/100', relevance: 'High', applications: '1 interview scheduled' },
}
const centerRows = [['Government ITI Ghaziabad', 'Ghaziabad', '3 programs', '1,240', '86%', 'High'], ['Government ITI Noida', 'Noida', '2 programs', '860', '78%', 'Strong'], ['Government ITI Aligarh', 'Aligarh', '4 programs', '1,540', '91%', 'High'], ['Skill Development Center Lucknow', 'Lucknow', '2 programs', '620', '72%', 'Watch']]
const employerRows = [['TCS', 'Technology', '12 open jobs', '48 hires', 'Actively hiring'], ['Infosys', 'Technology', '7 open jobs', '32 hires', 'Actively hiring'], ['HCLTech', 'Technology', '4 open jobs', '26 hires', 'Limited hiring'], ['Genpact', 'Business services', '9 open jobs', '21 hires', 'Actively hiring']]
const jobs = [
  { title: 'Digital Marketing Executive', company: 'TCS', location: 'Noida', salary: '₹38,000–45,000', experience: 'Fresher', required: ['SEO', 'Google Analytics', 'Content Strategy'], preferred: ['Canva'], program: 'Digital Marketing', education: 'BBA or equivalent', skills: ['SEO', 'Content Strategy', 'Google Analytics', 'Social Media Marketing'], posted: 7 },
  { title: 'SEO Executive', company: 'Wipro', location: 'Delhi', salary: '₹32,000–40,000', experience: 'Fresher', required: ['SEO', 'Content Strategy'], preferred: ['Google Analytics'], program: 'Digital Marketing', education: 'Any graduate', skills: ['SEO', 'Content Strategy', 'Google Analytics'], posted: 5 },
  { title: 'Data Analyst', company: 'Infosys', location: 'Pune', salary: '₹45,000–55,000', experience: 'Fresher', required: ['Excel', 'SQL', 'Power BI'], preferred: ['Python'], program: 'Data Analytics', education: 'BSc or equivalent', skills: ['Excel', 'SQL', 'Power BI', 'Python'], posted: 4 },
  { title: 'Junior Data Analyst', company: 'Accenture', location: 'Gurugram', salary: '₹42,000–50,000', experience: 'Fresher', required: ['Excel', 'SQL'], preferred: ['Statistics', 'Python'], program: 'Data Analytics', education: 'Any graduate', skills: ['Excel', 'SQL', 'Python', 'Statistics'], posted: 2 },
  { title: 'Frontend Web Developer', company: 'HCLTech', location: 'Noida', salary: '₹40,000–52,000', experience: 'Fresher', required: ['HTML', 'CSS', 'JavaScript', 'React'], preferred: ['Git'], program: 'Web Development', education: 'BCA or equivalent', skills: ['HTML', 'CSS', 'JavaScript', 'React', 'Git'], posted: 1 },
  { title: 'Customer Support Executive', company: 'Genpact', location: 'Gurugram', salary: '₹32,000–40,000', experience: 'Fresher', required: ['Communication', 'Customer Service', 'Documentation'], preferred: ['CRM'], program: 'Healthcare Support', education: 'Any graduate', skills: ['Communication', 'Customer Service', 'Documentation', 'CRM'], posted: 6 },
  { title: 'Retail Operations Executive', company: 'Tech Mahindra', location: 'Lucknow', salary: '₹28,000–35,000', experience: 'Fresher', required: ['Customer Service', 'Inventory', 'POS Systems'], preferred: ['Excel'], program: 'Retail Operations', education: 'Any graduate', skills: ['Customer Service', 'Inventory', 'POS Systems', 'Excel'], posted: 3 },
]
const applications = [['Digital Marketing Executive', 'TCS', '02 Sep 2026', 'Interview scheduled', 'warning'], ['Web Developer', 'HCLTech', '28 Aug 2026', 'Application under review', 'neutral'], ['Sales Executive', 'Genpact', '20 Aug 2026', 'Not selected', 'muted']]

function calculateRiskScore(trainee) {
  if (trainee.employment === 'Employed') return Math.max(6, Math.round((100 - trainee.progress) * .2))
  const performance = Number(trainee.performance.match(/\d+/)?.[0] || 60)
  const applicationCount = Number(trainee.applications.match(/\d+/)?.[0] || 0)
  const matchStrength = getRecommendedJobs(trainee).filter((job) => job.score >= 75).length
  let score = 0
  score += (100 - trainee.progress) * .35
  score += (100 - performance) * .25
  score += trainee.employment === 'Unemployed' ? 20 : trainee.employment === 'Seeking employment' ? 14 : 8
  score += Math.max(0, 12 - applicationCount * 4)
  score += Math.max(0, 15 - matchStrength * 5)
  score += trainee.relevance === 'High' ? 0 : 8
  return Math.min(100, Math.round(score))
}

function getRiskLevel(score) {
  return score >= 61 ? 'High' : score >= 31 ? 'Medium' : 'Low'
}

function getRiskReasons(trainee) {
  const reasons = []
  const performance = Number(trainee.performance.match(/\d+/)?.[0] || 60)
  const applicationCount = Number(trainee.applications.match(/\d+/)?.[0] || 0)
  const strongMatches = getRecommendedJobs(trainee).filter((job) => job.score >= 75).length
  if (trainee.progress < 70) reasons.push(`Training is ${trainee.progress}% complete with pending ${trainee.program} modules.`)
  if (trainee.employment !== 'Employed' && trainee.placement === 'Not placed') reasons.push('Training is active but no placement has been recorded.')
  if (applicationCount <= 1 && trainee.employment !== 'Employed') reasons.push(`Only ${applicationCount || 'no'} job application${applicationCount === 1 ? '' : 's'} has been submitted.`)
  if (performance < 75) reasons.push(`Assessment performance is ${performance}/100 and indicates an area for improvement.`)
  if (strongMatches < 2 && trainee.employment !== 'Employed') reasons.push('Current skills have limited strong matches with available jobs.')
  if (trainee.relevance !== 'High') reasons.push('Training-to-job relevance needs review before placement.')
  return reasons.slice(0, 4)
}

function getRecommendedInterventions(trainee) {
  const actions = []
  const gaps = buildSkillIntelligence(trainee).missing
  const applicationCount = Number(trainee.applications.match(/\d+/)?.[0] || 0)
  if (trainee.progress < 70) actions.push(`Support ${trainee.name} in completing the remaining training modules.`)
  if (gaps.length) actions.push(`Recommend ${gaps[0].skill} skill training to improve job compatibility.`)
  if (applicationCount <= 1 && trainee.employment !== 'Employed') actions.push('Encourage applications to relevant matched opportunities and schedule interview preparation.')
  if (trainee.placement === 'Not placed') actions.push('Schedule career counselling and connect the trainee with suitable employers.')
  return actions.slice(0, 3).length ? actions.slice(0, 3) : ['Continue quarterly mentoring and monitor employment progress.']
}

function getRiskProfile(trainee) {
  const score = calculateRiskScore(trainee)
  return { trainee, score, level: getRiskLevel(score), reasons: getRiskReasons(trainee), actions: getRecommendedInterventions(trainee) }
}

function getPriorityTrainees() {
  return Object.values(traineeDetails).map(getRiskProfile).sort((first, second) => second.score - first.score)
}

function PageHeader({ data }) {
  const eventName = { 'Add experience': 'eots:open-experience', 'Update status': 'eots:open-status', 'Edit profile': 'eots:open-profile', 'Browse courses': 'eots:open-courses', 'Export directory': 'eots:export-trainees', 'Add center': 'eots:open-center', 'Add employer': 'eots:open-employer', 'Record placement': 'eots:open-placement' }[data.action[0]]
  const action = eventName ? <button className="primary-action" type="button" onClick={() => window.dispatchEvent(new Event(eventName))}>{data.action[0]} <span>→</span></button> : <Link className="primary-action" to={data.action[1]}>{data.action[0]} <span>→</span></Link>
  return <div className="page-header"><div><p className="eyebrow">{data.eyebrow}</p><h1>{data.title}</h1><p className="page-intro">{data.intro}</p></div>{action}</div>
}

function StatCard({ label, value, detail, tone = 'mint', icon }) {
  return <div className={`stat-card ${tone}`}><div className="stat-top"><span className="stat-label">{label}</span><span className="stat-icon">{icon}</span></div><strong>{value}</strong><span className="stat-detail">{detail}</span></div>
}

function Donut({ value, label }) {
  return <div className="donut-wrap"><div className="donut" style={{ '--progress': `${value * 3.6}deg` }}><div><strong>{value}%</strong><small>{label}</small></div></div></div>
}

function MiniBars() {
  return <div className="mini-chart"><div className="chart-y"><span>100%</span><span>50%</span><span>0%</span></div><div className="bars">{[42, 58, 50, 72, 67, 84, 78, 92, 86, 100, 94, 100].map((height, i) => <span key={i} style={{ height: `${height}%` }}><i></i></span>)}</div><div className="chart-x"><span>Jan</span><span>Mar</span><span>May</span><span>Jul</span><span>Sep</span></div></div>
}

function Activity({ items = traineeActivity }) {
  return <div className="activity-list">{items.map(([date, title, detail, tone]) => <div className="activity-item" key={title}><span className={`activity-dot ${tone}`}></span><div><strong>{title}</strong><small>{detail}</small></div><time>{date}</time></div>)}</div>
}

function QuickActions({ items }) {
  return <div className="quick-actions panel"><div><span className="section-kicker">Move work forward</span><h2>Quick actions</h2></div><div className="quick-action-list">{items.map(([label, detail, path, icon]) => <Link className="quick-action" to={path} key={label}><span className="quick-action-icon">{icon}</span><span><strong>{label}</strong><small>{detail}</small></span><b>→</b></Link>)}</div></div>
}

function TraineeDashboard() {
  return <><div className="stat-grid four"><StatCard label="Training progress" value="72%" detail="+8% this month" tone="mint" icon="◒" /><StatCard label="Employment status" value="Active search" detail="Last updated 2 days ago" tone="lavender" icon="↗" /><StatCard label="Placement status" value="Interviewing" detail="2 active applications" tone="peach" icon="◎" /><StatCard label="Profile strength" value="86%" detail="Add one certification" tone="sky" icon="✦" /></div><div className="dashboard-grid trainee-grid"><section className="panel progress-panel"><div className="panel-heading"><div><span className="section-kicker">Your pathway</span><h2>Training progress</h2></div><Link to="/trainee/training">View details →</Link></div><div className="progress-layout"><Donut value={72} label="complete" /><div className="progress-copy"><strong>Digital Marketing Professional</strong><p>SkillForge Institute · Cohort 2025</p><div className="progress-track"><span style={{ width: '72%' }}></span></div><small>18 of 25 modules completed</small><div className="next-module"><span className="play">▶</span><div><small>Up next</small><strong>Campaign measurement fundamentals</strong></div><span>20 min</span></div></div></div></section><section className="panel"><div className="panel-heading"><div><span className="section-kicker">Your latest updates</span><h2>Recent activity</h2></div><Link to="/trainee/history">See all →</Link></div><Activity /></section></div><div className="dashboard-grid trainee-grid"><section className="panel employment-snapshot"><div className="panel-heading"><div><span className="section-kicker">Placement snapshot</span><h2>Company & job details</h2></div><span className="status-badge warning">Interviewing</span></div><div className="snapshot-fields"><div><small>Company</small><strong>Nexa Digital</strong></div><div><small>Role</small><strong>Digital Marketing Associate</strong></div><div><small>Expected salary</small><strong>₹42,000 / month</strong></div><div><small>Next step</small><strong>Interview · 06 Sep</strong></div></div></section><QuickActions items={[["Continue training", "1 module ready", "/trainee/training", "▶"], ["Update profile", "Add certification", "/trainee/profile", "✦"]]} /></div><section className="panel opportunity-panel"><div><span className="section-kicker">Your next best action</span><h2>Make your profile discoverable</h2><p>Complete your portfolio link and increase your visibility to 12 partner employers.</p></div><Link className="secondary-action" to="/trainee/profile">Complete profile <span>→</span></Link></section></>
}

function RiskBadge({ level }) {
  return <span className={`risk-badge ${level.toLowerCase()}`}>{level.toUpperCase()}</span>
}

function RiskDetailModal({ profile, onClose, onReviewed, reviewed, note, setNote, onSaveNote }) {
  const trainee = profile.trainee
  const performance = Number(trainee.performance.match(/\d+/)?.[0] || 60)
  const applicationCount = Number(trainee.applications.match(/\d+/)?.[0] || 0)
  const matchStrength = Math.min(100, getRecommendedJobs(trainee).slice(0, 3).reduce((sum, job) => sum + job.score, 0) / 3)
  return <Modal title="Employment Risk Analysis" onClose={onClose}><div className="risk-detail"><div className="risk-detail-hero"><div><small>Trainee</small><h2>{trainee.name}</h2><p>{trainee.id} · {trainee.program}</p></div><div><RiskBadge level={profile.level} /><strong>{profile.score} / 100</strong><small>Risk score</small></div></div><div className="risk-factors">{[['Training Completion', trainee.progress], ['Assessment', performance], ['Job Match Strength', matchStrength], ['Application Activity', Math.min(100, applicationCount * 25)]].map(([label, value]) => <div key={label}><div><span>{label}</span><b>{Math.round(value)}%</b></div><span className="risk-progress"><i style={{ width: `${value}%` }}></i></span></div>)}<div className="risk-factor-status"><span>Employment Status</span><b>{trainee.employment}</b></div></div><section><h3>Why is this trainee flagged?</h3><ul className="risk-reasons">{profile.reasons.map((reason) => <li key={reason}>{reason}</li>)}</ul></section><section><h3>Recommended Intervention</h3><ul className="risk-actions">{profile.actions.map((action) => <li key={action}>{action}</li>)}</ul></section><div className="intervention-actions">{reviewed ? <span className="reviewed-label">Reviewed ✓</span> : <button className="secondary-action" type="button" onClick={onReviewed}>Mark as Reviewed</button>}<div className="intervention-note"><input value={note} onChange={(event) => setNote(event.target.value)} placeholder="Add intervention note" aria-label="Add intervention note" /><button className="primary-action" type="button" onClick={onSaveNote} disabled={!note.trim()}>Save Note</button></div></div></div></Modal>
}

function EmploymentEarlyWarning() {
  const profiles = getPriorityTrainees()
  const counts = profiles.reduce((result, profile) => ({ ...result, [profile.level]: result[profile.level] + 1 }), { High: 0, Medium: 0, Low: 0 })
  const attention = counts.High + counts.Medium
  return <section className="early-warning panel"><div className="early-warning-header"><div><span className="section-kicker">Decision support</span><h2>Employment Early Warning</h2><p>Trainees who may need additional employment support</p></div><Link className="secondary-action" to="/gov-officer/trainees?risk=attention">View All At-Risk Trainees →</Link></div><div className="risk-summary-grid"><div><RiskBadge level="High" /><strong>{counts.High}</strong><small>Immediate support</small></div><div><RiskBadge level="Medium" /><strong>{counts.Medium}</strong><small>Monitor closely</small></div><div><RiskBadge level="Low" /><strong>{counts.Low}</strong><small>On track</small></div><div className="attention"><span>Needs attention</span><strong>{attention}</strong><small>High + Medium risk</small></div></div><div className="priority-trainees"><div className="panel-heading"><div><span className="section-kicker">Priority queue</span><h3>Priority Trainees</h3></div></div>{profiles.filter((profile) => profile.level !== 'Low').slice(0, 5).map((profile) => <div className="priority-row" key={profile.trainee.id}><div className="priority-avatar">{profile.trainee.name.split(' ').map((part) => part[0]).join('')}</div><div><strong>{profile.trainee.name}</strong><small>{profile.trainee.program} · {profile.reasons[0]}</small></div><RiskBadge level={profile.level} /><Link to={`/gov-officer/trainees/${profile.trainee.id}`}>View →</Link></div>)}</div></section>
}

function assistantAnswer(question) {
  const normalized = normalize(question)
  const profiles = Object.values(traineeDetails)
  const riskProfiles = getPriorityTrainees()
  const districtStats = [...new Set(profiles.map((trainee) => trainee.district))].map((district) => {
    const group = profiles.filter((trainee) => trainee.district === district)
    return { district, rate: Math.round(group.filter((trainee) => trainee.employment === 'Employed').length / group.length * 100), count: group.length }
  }).sort((first, second) => first.rate - second.rate)
  const programStats = [...new Set(profiles.map((trainee) => trainee.program))].map((program) => {
    const group = profiles.filter((trainee) => trainee.program === program)
    return { program, rate: Math.round(group.filter((trainee) => trainee.placement === 'Placed').length / group.length * 100), count: group.length }
  }).sort((first, second) => second.rate - first.rate)
  const skillCounts = {}
  jobs.forEach((job) => job.required.forEach((skill) => { skillCounts[skill] = (skillCounts[skill] || 0) + 1 }))
  const demanded = Object.entries(skillCounts).sort((first, second) => second[1] - first[1]).slice(0, 4).map(([skill, count]) => `${skill} (${count} roles)`)
  if (/lowest|least|weakest/.test(normalized) && /district|area|location/.test(normalized)) { const item = districtStats[0]; return { title: '📊 Employment Insight', body: `Lowest employment rate: ${item.district}\nEmployment Rate: ${item.rate}%\nTrainees: ${item.count}\n\nRecommended Action: Review placement support and job matching for unemployed trainees in ${item.district}.` } }
  if (/best|highest|top/.test(normalized) && /program|course|training/.test(normalized)) { const item = programStats[0]; return { title: '📈 Programme Insight', body: `Highest placement program: ${item.program}\nPlacement Rate: ${item.rate}%\nTrainees: ${item.count}\n\nRecommended Action: Study this program's employer partnerships for practices that can be shared across the network.` } }
  if (/center|centre|institute/.test(normalized) && /best|highest|performance|placement/.test(normalized)) { const centerStats = [...new Set(profiles.map((trainee) => trainee.center))].map((center) => { const group = profiles.filter((trainee) => trainee.center === center); return { center, rate: Math.round(group.filter((trainee) => trainee.placement === 'Placed').length / group.length * 100), trainees: group.length } }).sort((first, second) => second.rate - first.rate); const item = centerStats[0]; return { title: '🏫 Training Center Insight', body: `Best placement center: ${item.center}\nPlacement Rate: ${item.rate}%\nTrainees: ${item.trainees}\n\nRecommended Action: Review this center's employer connections and share effective placement practices across the network.` } }
  if (/high risk|risk|attention|priority/.test(normalized)) { const high = riskProfiles.filter((profile) => profile.level === 'High'); return { title: '🚨 Priority Trainees', body: high.length ? high.map((profile, index) => `${index + 1}. ${profile.trainee.name} — ${profile.level} Risk\n   Main issue: ${profile.reasons[0]}`).join('\n\n') : 'No high-risk trainees are currently flagged in the demo data.' } }
  if (/skill|demand|demanded/.test(normalized)) return { title: '🧭 Skills Insight', body: `Most demanded skills across demo opportunities:\n\n${demanded.map((skill, index) => `${index + 1}. ${skill}`).join('\n')}\n\nRecommended Action: Prioritize these skills in upcoming training and employer-aligned modules.` }
  if (/unemployed|without employment|not employed/.test(normalized)) { const unemployed = profiles.filter((trainee) => trainee.employment !== 'Employed'); return { title: '👥 Employment Snapshot', body: `Trainees currently without recorded employment: ${unemployed.length}\n\n${unemployed.map((trainee) => `• ${trainee.name} — ${trainee.program}`).join('\n')}\n\nRecommended Action: Review their risk profile and connect them with relevant matched opportunities.` } }
  if (/immediate|prioriti[sz]e|improve employment|outcome/.test(normalized)) return { title: '🧩 Recommended Priorities', body: `1. Support ${riskProfiles[0].trainee.name} with: ${riskProfiles[0].actions[0]}\n2. Focus employer outreach on ${districtStats[0].district}, the lowest employment-rate district.\n3. Expand learning pathways for: ${demanded.slice(0, 2).join(' and ')}.` }
  if (/job|match|opportunit/.test(normalized)) { const matches = profiles.flatMap((trainee) => getRecommendedJobs(trainee).slice(0, 1).map((job) => `${job.title} at ${job.company} — ${job.score}% match for ${trainee.name}`)); return { title: '💼 Job Matching Insight', body: `Best current demo matches:\n\n${matches.join('\n')}\n\nRecommended Action: Encourage high-risk trainees to apply to their strongest matches.` } }
  return { title: 'Gov Officer Assistant', body: 'I can currently help with employment rates, placements, trainee risk, training programs, training centers, job demand and skills.' }
}

function GovOfficerAssistant() {
  const suggestions = ['Lowest employment district', 'Best performing training center', 'High-risk trainees', 'Most demanded skills', 'Best training program', 'Unemployed trainees']
  const [open, setOpen] = useState(false)
  const [question, setQuestion] = useState('')
  const [messages, setMessages] = useState([])
  const [thinking, setThinking] = useState(false)
  const ask = (value = question) => { const prompt = value.trim(); if (!prompt || thinking) return; setQuestion(''); setMessages((current) => [...current, { type: 'question', text: prompt }]); setThinking(true); window.setTimeout(() => { setMessages((current) => [...current, { type: 'answer', ...assistantAnswer(prompt) }]); setThinking(false) }, 450) }
  return <><section className="assistant-card panel"><div><span className="ai-spark small">✦</span><div><span className="section-kicker">Decision support</span><h2>Gov Officer Assistant</h2><p>Ask questions about training and employment outcomes</p></div></div><button className="primary-action" type="button" onClick={() => setOpen(true)}>Ask Assistant <span>→</span></button></section>{open && <Modal title="Gov Officer Assistant" onClose={() => setOpen(false)}><div className="assistant-dialog"><p className="assistant-subtitle">Ask questions about training and employment outcomes</p><div className="assistant-messages">{!messages.length && <div className="assistant-empty"><span className="ai-spark small">✦</span><strong>How can I help today?</strong><p>Explore the demo data with a question below.</p></div>}{messages.map((message, index) => message.type === 'question' ? <div className="assistant-message question" key={index}>{message.text}</div> : <div className="assistant-message answer" key={index}><strong>{message.title}</strong><p>{message.body}</p></div>)}{thinking && <div className="assistant-thinking">Analysing EOTS demo data<span>•••</span></div>}</div><div className="assistant-suggestions">{suggestions.map((suggestion) => <button type="button" key={suggestion} onClick={() => ask(suggestion)}>{suggestion}</button>)}</div><div className="assistant-input"><input value={question} onChange={(event) => setQuestion(event.target.value)} onKeyDown={(event) => event.key === 'Enter' && ask()} placeholder="Ask about trainees, employment or placements" aria-label="Ask Gov Officer Assistant" /><button className="primary-action" type="button" onClick={() => ask()} disabled={!question.trim() || thinking}>Send</button></div></div></Modal>}</>
}

function OfficerDashboard() {
  return <><div className="stat-grid four"><StatCard label="Total trainees" value="12,480" detail="+6.4% vs last quarter" tone="mint" icon="◎" /><StatCard label="Employment rate" value="70.0%" detail="8,736 trainees employed" tone="lavender" icon="↗" /><StatCard label="Placement rate" value="70.0%" detail="+4.8% this quarter" tone="peach" icon="◒" /><StatCard label="Average salary" value="₹38,420" detail="+8.2% year on year" tone="sky" icon="₹" /></div><GovOfficerAssistant /><EmploymentEarlyWarning /><div className="dashboard-grid officer-grid"><section className="panel chart-panel"><div className="panel-heading"><div><span className="section-kicker">Outcome movement</span><h2>Employment outcomes</h2></div><button className="period-button">Last 12 months ⌄</button></div><div className="chart-legend"><span><i className="legend-employed"></i> Employed</span><span><i className="legend-training"></i> In training</span></div><MiniBars /></section><section className="panel network-panel"><div className="panel-heading"><div><span className="section-kicker">Active ecosystem</span><h2>Partner employers</h2></div><Link to="/gov-officer/employers">View all →</Link></div><div className="partner-list">{[['TCS', 'Technology', '48 hires', 'TCS'], ['Infosys', 'Technology', '32 hires', 'IN'], ['HCLTech', 'Technology', '26 hires', 'HC']].map(([name, category, hires, initials]) => <div className="partner-row" key={name}><span className="partner-logo">{initials}</span><div><strong>{name}</strong><small>{category}</small></div><b>{hires}</b></div>)}</div><Link className="network-link" to="/gov-officer/employers">Explore employer network <span>→</span></Link></section></div><section className="panel table-panel"><div className="panel-heading"><div><span className="section-kicker">Outcome operations</span><h2>Recent placements</h2></div><Link to="/gov-officer/placements">View all →</Link></div><DataTable rows={placements} headers={['Trainee', 'Role', 'Company', 'Salary', 'Placed']} /></section><QuickActions items={[["View trainees", "Review the cohort", "/gov-officer/trainees", "◎"], ["Record placement", "Update outcomes", "/gov-officer/placements", "↗"], ["Generate report", "Export programme data", "/gov-officer/reports-insights", "▦"]]} /></>
}

function DataTable({ rows, headers, onRowClick }) {
  return <div className="table-scroll"><table><thead><tr>{headers.map((header) => <th key={header}>{header}</th>)}</tr></thead><tbody>{rows.map((row) => <tr key={row.join('-')} className={onRowClick ? 'table-row-clickable' : ''} onClick={() => onRowClick?.(row)} onKeyDown={(event) => event.key === 'Enter' && onRowClick?.(row)} tabIndex={onRowClick ? 0 : undefined}>{row.map((cell, i) => <td key={cell}>{i === row.length - 1 && (cell === 'Today' || cell === 'Placed' || cell === 'Interviewing' || cell === 'In training' || cell === 'Active' || cell === 'Completed' || cell === 'Not placed') ? <span className={`status-badge ${cell === 'Placed' || cell === 'Today' || cell === 'Completed' ? 'success' : cell === 'Interviewing' || cell === 'Active' ? 'warning' : 'neutral'}`}>{cell}</span> : cell}</td>)}</tr>)}</tbody></table></div>
}

function Toolbar({ placeholder = 'Search records', label = 'Filter', value = '', onChange, onAction, actionLabel }) {
  return <div className="table-tools"><input value={value} onChange={(event) => onChange?.(event.target.value)} placeholder={placeholder} aria-label={placeholder} />{label !== 'Search' && <button type="button" onClick={onAction}>{actionLabel || label}</button>}{value && <button type="button" onClick={() => onChange?.('')} aria-label="Clear search">Clear</button>}</div>
}

function DetailPanel({ title, subtitle, fields, backPath }) {
  return <section className="panel detail-panel"><div className="detail-heading"><div><span className="section-kicker">Record detail</span><h2>{title}</h2><p>{subtitle}</p></div><Link className="secondary-action" to={backPath}>← Back to list</Link></div><div className="detail-fields">{fields.map(([label, value]) => <div key={label}><small>{label}</small><strong>{value}</strong></div>)}</div></section>
}

const intelligenceProfiles = {
  'Digital Marketing': {
    targetSkills: ['SEO', 'Google Analytics', 'Social Media Marketing', 'Content Strategy'],
    courses: [['Advanced Digital Marketing Analytics', ['Google Analytics', 'SEO'], '8 weeks', 'Intermediate', 'National Skill Development Corporation', 'Strengthen campaign measurement and search performance skills.'], ['Social Media Marketing Lab', ['Social Media Marketing', 'Content Strategy'], '6 weeks', 'Intermediate', 'Government ITI Noida', 'Build practical social campaign planning and reporting skills.']],
  },
  'Data Analytics': {
    targetSkills: ['Excel', 'SQL', 'Python', 'Power BI'],
    courses: [['Python for Data Analysis', ['Python', 'Advanced SQL'], '8 weeks', 'Intermediate', 'Government ITI Ghaziabad', 'Build stronger analytical workflows for reporting and business analysis roles.'], ['Power BI Reporting Studio', ['Power BI', 'Data Visualization'], '6 weeks', 'Intermediate', 'National Skill Development Corporation', 'Create decision-ready dashboards from operational data.']],
  },
  'Healthcare Support': {
    targetSkills: ['Patient Care', 'Documentation', 'Communication', 'Medical Records'],
    courses: [['Healthcare Documentation & Records', ['Medical Records', 'Documentation'], '6 weeks', 'Intermediate', 'Government ITI Lucknow', 'Improve accuracy and confidence in healthcare administration workflows.'], ['Patient Care Readiness', ['Patient Care', 'Communication'], '8 weeks', 'Beginner', 'Skill Development Center Lucknow', 'Practice workplace communication and patient support routines.']],
  },
  'Retail Operations': {
    targetSkills: ['Customer Service', 'Inventory', 'POS Systems', 'Excel'],
    courses: [['Retail Data & Inventory', ['Excel', 'Inventory'], '6 weeks', 'Intermediate', 'Government ITI Agra', 'Build confidence with stock reporting and retail data workflows.'], ['Customer Experience Excellence', ['Customer Service', 'Communication'], '4 weeks', 'Beginner', 'National Skill Development Corporation', 'Strengthen service conversations and customer retention skills.']],
  },
  'Web Development': {
    targetSkills: ['HTML', 'CSS', 'JavaScript', 'React'],
    courses: [['React Application Development', ['React', 'JavaScript'], '10 weeks', 'Intermediate', 'Government ITI Aligarh', 'Extend frontend foundations into component-based web applications.'], ['Responsive Web Design', ['HTML', 'CSS'], '6 weeks', 'Beginner', 'National Skill Development Corporation', 'Improve accessibility and responsive layout implementation.']],
  },
}

function buildSkillIntelligence(trainee) {
  const profile = intelligenceProfiles[trainee.program] || intelligenceProfiles['Digital Marketing']
  const currentSkills = trainee.skills.split(' · ')
  const normalizedCurrent = currentSkills.join(' ').toLowerCase()
  const matched = profile.targetSkills.filter((skill) => normalizedCurrent.includes(skill.toLowerCase().split(' ')[0]))
  const missing = profile.targetSkills.filter((skill) => !matched.includes(skill)).map((skill, index) => ({ skill, priority: index === 0 ? 'High' : index === 1 ? 'Medium' : 'Low' }))
  const recommendations = profile.courses.map(([course, skills, duration, level, provider, description], index) => {
    const courseGaps = skills.filter((skill) => missing.some((gap) => gap.skill.toLowerCase() === skill.toLowerCase() || gap.skill.toLowerCase().includes(skill.toLowerCase()) || skill.toLowerCase().includes(gap.skill.toLowerCase())))
    const priority = courseGaps.length ? (index === 0 ? 'High' : 'Medium') : 'Low'
    return { course, skills, duration, level, provider, description, priority, reason: courseGaps.length ? `Recommended because ${courseGaps.join(' and ')} ${courseGaps.length === 1 ? 'is' : 'are'} currently missing from ${trainee.name}'s profile and relevant to ${trainee.role}.` : `Recommended to reinforce the existing ${trainee.program} foundation and support progression toward ${trainee.role}.`, benefit: `May improve job eligibility and strengthen the candidate profile for relevant ${trainee.program} roles.` }
  })
  return { matched, missing, recommendations }
}

function TraineeDetail({ trainee }) {
  const intelligence = buildSkillIntelligence(trainee)
  const recommendations = []
  if (trainee.progress < 100) recommendations.push(`Complete the remaining ${100 - trainee.progress}% of ${trainee.program} modules.`)
  if (trainee.placement === 'Not placed') recommendations.push(`Schedule interview preparation and match ${trainee.name} with entry-level ${trainee.program} roles.`)
  if (trainee.performance.includes('Developing')) recommendations.push(`Enroll in an advanced ${trainee.program} skills workshop and book a mentor review.`)
  if (trainee.employment === 'Employed' && trainee.relevance !== 'High') recommendations.push('Explore role-relevant upskilling to strengthen long-term career progression.')
  if (recommendations.length === 0) recommendations.push('Continue quarterly mentoring and explore the next level of professional certification.')
  return <TraineeIntelligenceDetail trainee={trainee} intelligence={intelligence} />
  return <><section className="panel detail-panel trainee-detail-panel"><div className="detail-heading"><div><span className="section-kicker">Trainee profile</span><h2>{trainee.name}</h2><p>{trainee.id} · {trainee.program} · {trainee.center}</p></div><Link className="secondary-action" to="/gov-officer/trainees">← Back to trainees</Link></div><div className="detail-fields"><div><small>District / location</small><strong>{trainee.district}</strong></div><div><small>Training progress</small><strong>{trainee.progress}% complete</strong></div><div><small>Completion status</small><strong>{trainee.completion}</strong></div><div><small>Employment status</small><strong>{trainee.employment}</strong></div><div><small>Placement status</small><strong>{trainee.placement}</strong></div><div><small>Assessment</small><strong>{trainee.performance}</strong></div></div></section><section className="detail-section-grid"><section className="panel outcome-panel"><div className="panel-heading"><div><span className="section-kicker">Outcome review</span><h2>Training & Employment Outcome</h2></div><span className={`status-badge ${trainee.placement === 'Placed' ? 'success' : trainee.placement === 'Not placed' ? 'neutral' : 'warning'}`}>{trainee.placement}</span></div><div className="outcome-summary"><div><span className="outcome-mark">✓</span><div><small>Skills acquired</small><strong>{trainee.skills}</strong></div></div><div><span className="outcome-mark">↗</span><div><small>Current job / role</small><strong>{trainee.company} · {trainee.role}</strong></div></div><div><span className="outcome-mark">₹</span><div><small>Salary</small><strong>{trainee.salary}</strong></div></div><div><span className="outcome-mark">◷</span><div><small>Applications / interview activity</small><strong>{trainee.applications}</strong></div></div></div><div className="relevance-note"><small>Current job relevance to training</small><strong>{trainee.relevance}</strong></div></section><section className="panel recommendation-panel"><div className="panel-heading"><div><span className="section-kicker">Local programme guidance</span><h2>Recommended Next Steps</h2></div><span className="ai-spark small">✦</span></div><div className="recommendation-list">{recommendations.map((recommendation, index) => <div key={recommendation}><span>{index + 1}</span><p>{recommendation}</p></div>)}</div></section></section><section className="panel history-panel"><div className="panel-heading"><div><span className="section-kicker">Record history</span><h2>Employment History</h2></div></div><p className="history-summary">{trainee.history}</p></section></>
}

function TraineeIntelligenceDetail({ trainee, intelligence }) {
  return <><section className="panel detail-panel trainee-detail-panel"><div className="detail-heading"><div><span className="section-kicker">Trainee profile</span><h2>{trainee.name}</h2><p>{trainee.id} · {trainee.program} · {trainee.center}</p></div><Link className="secondary-action" to="/gov-officer/trainees">← Back to trainees</Link></div><div className="detail-fields"><div><small>District / location</small><strong>{trainee.district}</strong></div><div><small>Training progress</small><strong>{trainee.progress}% complete</strong></div><div><small>Completion status</small><strong>{trainee.completion}</strong></div><div><small>Employment status</small><strong>{trainee.employment}</strong></div><div><small>Placement status</small><strong>{trainee.placement}</strong></div><div><small>Assessment / performance</small><strong>{trainee.performance}</strong></div></div></section><section className="panel training-outcome-panel"><div className="panel-heading"><div><span className="section-kicker">Selected trainee outcome</span><h2>Training Outcome</h2></div><span className={`status-badge ${trainee.placement === 'Placed' ? 'success' : trainee.placement === 'Not placed' ? 'neutral' : 'warning'}`}>{trainee.placement}</span></div><div className="outcome-summary"><div><span className="outcome-mark">▣</span><div><small>Training program / center</small><strong>{trainee.program} · {trainee.center}</strong></div></div><div><span className="outcome-mark">✓</span><div><small>Completion status</small><strong>{trainee.completion} · {trainee.progress}%</strong></div></div><div><span className="outcome-mark">◎</span><div><small>Skills acquired</small><strong>{trainee.skills}</strong></div></div><div><span className="outcome-mark">↗</span><div><small>Employment / current role</small><strong>{trainee.employment} · {trainee.company} · {trainee.role}</strong></div></div><div><span className="outcome-mark">₹</span><div><small>Salary</small><strong>{trainee.salary}</strong></div></div><div><span className="outcome-mark">◷</span><div><small>Training-to-job relevance</small><strong>{trainee.relevance}</strong></div></div></div><div className="relevance-note"><small>Applications / interview activity</small><strong>{trainee.applications}</strong></div></section><section className="panel skill-gap-panel"><div className="panel-heading"><div><span className="section-kicker">Personalized comparison</span><h2>Skill Gap Analysis</h2><p className="panel-supporting">Current skills compared with skills relevant to {trainee.role}.</p></div><span className="status-badge neutral">{intelligence.matched.length} matched · {intelligence.missing.length} gaps</span></div><div className="skill-gap-grid"><div><h3>Matched skills</h3><div className="skill-badges">{intelligence.matched.length ? intelligence.matched.map((skill) => <span className="skill-match" key={skill}>✓ {skill}</span>) : <span className="skill-empty">No target skills matched yet</span>}</div></div><div><h3>Missing skills</h3><div className="skill-badges">{intelligence.missing.length ? intelligence.missing.map(({ skill, priority }) => <span className={`skill-gap ${priority.toLowerCase()}`} key={skill}>⚠ {skill}<b>{priority}</b></span>) : <span className="skill-empty">No priority gaps identified</span>}</div></div></div></section><section className="recommendation-section"><div className="section-heading-row"><div><span className="section-kicker">Offline programme logic</span><h2>Recommended Training</h2><p>Recommendations for {trainee.name}</p></div><span className="ai-spark small">✦</span></div><div className="training-recommendation-grid">{intelligence.recommendations.map((recommendation) => <article className="training-recommendation" key={recommendation.course}><div className="recommendation-top"><span className={`priority-badge ${recommendation.priority.toLowerCase()}`}>{recommendation.priority} priority</span><span>{recommendation.duration}</span></div><h3>{recommendation.course}</h3><p>{recommendation.description}</p><div className="recommendation-meta"><span>Skills: {recommendation.skills.join(' · ')}</span><span>{recommendation.level} · {recommendation.provider}</span></div><div className="recommendation-reason"><small>Why it is recommended</small><strong>{recommendation.reason}</strong></div><div className="recommendation-benefit"><small>Expected Benefit</small><strong>{recommendation.benefit}</strong></div></article>)}</div></section><section className="panel history-panel"><div className="panel-heading"><div><span className="section-kicker">Record history</span><h2>Employment History</h2></div></div><p className="history-summary">{trainee.history}</p></section></>
}

function normalize(value) {
  return String(value || '').toLowerCase().replace(/[^a-z0-9 ]/g, ' ').replace(/\s+/g, ' ').trim()
}

function getMatchedSkills(trainee, job) {
  const current = normalize(trainee.skills)
  return job.required.filter((skill) => current.includes(normalize(skill)))
}

function getMissingSkills(trainee, job) {
  const current = normalize(trainee.skills)
  return job.required.filter((skill) => !current.includes(normalize(skill)))
}

function calculateJobMatch(trainee, job) {
  const matched = getMatchedSkills(trainee, job)
  const skillScore = matched.length / job.required.length
  const trainingScore = normalize(trainee.program) === normalize(job.program) ? 1 : 0
  const roleScore = normalize(trainee.role).split(' ').some((word) => word.length > 3 && normalize(job.title).includes(word)) || normalize(job.program).includes(normalize(trainee.program).split(' ')[0]) ? 1 : .55
  const educationScore = job.education === 'Any graduate' || normalize(trainee.education || '').includes(normalize(job.education).split(' ')[0]) ? 1 : .7
  const locationScore = normalize(job.location).includes(normalize(trainee.district)) || normalize(trainee.district).includes(normalize(job.location)) ? 1 : .5
  return Math.round((skillScore * 50 + trainingScore * 20 + roleScore * 15 + educationScore * 10 + locationScore * 5))
}

function getMatchExplanation(trainee, job, score, missing) {
  const training = normalize(trainee.program) === normalize(job.program) ? `${trainee.program} training` : `${trainee.program} foundation`
  const location = normalize(job.location).includes(normalize(trainee.district)) ? `the ${trainee.district} location` : `entry-level roles across nearby job markets`
  return `Your ${training} and current skills align with this ${job.title} role in ${location}, resulting in a ${score}% match.`
}

function getRecommendedJobs(trainee) {
  return jobs.map((job) => {
    const matchedSkills = getMatchedSkills(trainee, job)
    const missingSkills = getMissingSkills(trainee, job)
    const score = calculateJobMatch(trainee, job)
    return { ...job, score, matchedSkills, missingSkills, explanation: getMatchExplanation(trainee, job, score, missingSkills) }
  }).sort((first, second) => second.score - first.score)
}

function getActiveJobTrainee(location) {
  const requestedId = new URLSearchParams(location.search).get('traineeId')
  if (requestedId && traineeDetails[requestedId]) return traineeDetails[requestedId]
  const session = JSON.parse(localStorage.getItem('eots-session') || '{}')
  return traineeDetails[session.traineeId] || traineeDetails['TR-2048']
}

function JobMatchDetails({ match, trainee, onClose }) {
  const trainingRelevance = normalize(trainee.program) === normalize(match.program) ? 100 : 55
  const locationRelevance = normalize(match.location).includes(normalize(trainee.district)) ? 100 : 50
  const skillPercent = Math.round((match.matchedSkills.length / match.required.length) * 100)
  return <Modal title="Job Match Analysis" onClose={onClose}><div className="match-analysis"><div className="match-score-large"><strong>{match.score}%</strong><span>Match score</span></div><div className="match-metrics">{[['Skill Match', skillPercent], ['Training Relevance', trainingRelevance], ['Role Relevance', match.score >= 80 ? 90 : 65], ['Location Compatibility', locationRelevance]].map(([label, value]) => <div key={label}><div><span>{label}</span><b>{value}%</b></div><span className="match-progress"><i style={{ width: `${value}%` }}></i></span></div>)}</div><div className="match-detail-grid"><div><h3>Skills You Already Have</h3><div className="skill-badges">{match.matchedSkills.map((skill) => <span className="skill-match" key={skill}>✓ {skill}</span>)}</div></div><div><h3>Skills You May Need</h3><div className="skill-badges">{match.missingSkills.length ? match.missingSkills.map((skill) => <span className="skill-gap medium" key={skill}>⚠ {skill}</span>) : <span className="skill-empty">Strong Skill Match</span>}</div></div></div><div className="match-explanation"><small>Why We Recommend This Job</small><p>{match.explanation}</p>{match.missingSkills.length ? <strong>Recommended next step: Complete training in {match.missingSkills[0]} to improve your match for this role.</strong> : <strong>Strong Skill Match: your current profile covers the important required skills.</strong>}</div></div></Modal>
}

function JobMatchCard({ match, trainee, applications, setApplications, onDetails, setToast }) {
  const isApplied = applications.some((application) => application.jobId === match.title + match.company)
  const apply = () => {
    if (isApplied) return
    const next = [...applications, { jobId: match.title + match.company, role: match.title, company: match.company, date: 'Today', status: 'Application submitted', tone: 'warning' }]
    setApplications(next)
    localStorage.setItem(`eots-applications-${trainee.id}`, JSON.stringify(next))
    window.dispatchEvent(new Event('eots-applications-updated'))
    setToast('Application submitted successfully')
    window.setTimeout(() => setToast(''), 2600)
  }
  return <article className="match-job-card"><div className="match-card-top"><span className={`match-score-badge ${match.score >= 80 ? 'strong' : match.score >= 60 ? 'possible' : 'low'}`}>{match.score}% <small>Match</small></span><span className="status-badge neutral">{match.experience}</span></div><h3>{match.title}</h3><p className="job-company">{match.company} · {match.location}</p><strong className="job-salary">{match.salary}</strong><div className="job-skills"><small>Required skills</small><div className="skill-badges">{match.required.map((skill) => <span className={match.matchedSkills.includes(skill) ? 'skill-match' : 'skill-gap medium'} key={skill}>{match.matchedSkills.includes(skill) ? '✓' : '⚠'} {skill}</span>)}</div></div><p className="match-explanation">{match.explanation}</p><div className="match-card-actions"><button className="secondary-action" type="button" onClick={() => onDetails(match)}>View Match Details</button><button className={`job-apply ${isApplied ? 'applied' : ''}`} type="button" onClick={apply}>{isApplied ? 'Applied ✓' : 'Apply Now'}</button></div></article>
}

function JobOpportunitiesPage() {
  const location = useLocation()
  const trainee = getActiveJobTrainee(location)
  const [search, setSearch] = useState('')
  const [role, setRole] = useState('all')
  const [jobLocation, setJobLocation] = useState('all')
  const [experience, setExperience] = useState('all')
  const [salary, setSalary] = useState('all')
  const [sort, setSort] = useState('match')
  const [selectedMatch, setSelectedMatch] = useState(null)
  const [toast, setToast] = useState('')
  const [applications, setApplications] = useState(() => JSON.parse(localStorage.getItem(`eots-applications-${trainee.id}`) || '[]'))
  const matches = getRecommendedJobs(trainee)
  const salaryFloor = (match) => Number(match.salary.replace(/[^0-9]/g, '').slice(0, 2)) * 1000
  const filtered = matches.filter((match) => { const haystack = `${match.title} ${match.company} ${match.location} ${match.required.join(' ')} ${match.program}`.toLowerCase(); return haystack.includes(search.toLowerCase()) && (role === 'all' || match.title === role) && (jobLocation === 'all' || match.location === jobLocation) && (experience === 'all' || match.experience === experience) && (salary === 'all' || salaryFloor(match) >= Number(salary)) }).sort((first, second) => sort === 'salary' ? salaryFloor(second) - salaryFloor(first) : sort === 'latest' ? second.posted - first.posted : second.score - first.score)
  const topGap = matches.flatMap((match) => match.missingSkills)[0] || 'No major gap'
  const strongMatches = matches.filter((match) => match.score >= 80).length
  return <><section className="smart-match-profile"><div><span className="ai-spark small">✦</span><div><span className="section-kicker">Smart Job Matching</span><h2>Your Job Match Profile</h2><p>Training: <strong>{trainee.program}</strong> · Skills: <strong>{trainee.skills.split(' · ').length}</strong></p></div></div><div className="match-profile-stats"><span><b>{strongMatches}</b> Strong matches</span><span><b>{matches.length - strongMatches}</b> Potential matches</span><span><b>{topGap}</b> Top skill gap</span></div></section><section className="career-insight"><span className="insight-icon">✦</span><div><small>Career Insight</small><p>Based on your {trainee.program} training and current skills, you are a strong match for entry-level {trainee.program === 'Data Analytics' ? 'analytics and data' : trainee.program === 'Web Development' ? 'frontend and software development' : trainee.program.toLowerCase()} roles in {trainee.district} and nearby markets.</p><strong>Recommended action: strengthen {topGap} to unlock more relevant roles.</strong></div></section><div className="job-filters"><Toolbar value={search} onChange={setSearch} placeholder="Search company, role, location or skill" label="Search" /><select value={role} onChange={(event) => setRole(event.target.value)} aria-label="Filter by job role"><option value="all">All roles</option>{[...new Set(matches.map((match) => match.title))].map((title) => <option key={title}>{title}</option>)}</select><select value={jobLocation} onChange={(event) => setJobLocation(event.target.value)} aria-label="Filter by job location"><option value="all">All locations</option>{[...new Set(matches.map((match) => match.location))].map((value) => <option key={value}>{value}</option>)}</select><select value={experience} onChange={(event) => setExperience(event.target.value)} aria-label="Filter by experience"><option value="all">All experience</option><option>Fresher</option></select><select value={salary} onChange={(event) => setSalary(event.target.value)} aria-label="Filter by salary"><option value="all">All salary ranges</option><option value="30000">₹30k+</option><option value="40000">₹40k+</option><option value="50000">₹50k+</option></select><select value={sort} onChange={(event) => setSort(event.target.value)} aria-label="Sort jobs"><option value="match">Best Match</option><option value="salary">Highest Salary</option><option value="latest">Latest Jobs</option></select></div><section className="recommended-jobs"><div className="section-heading-row"><div><span className="section-kicker">Personalized opportunities</span><h2>Recommended for You</h2><p>Jobs matched to your training, skills and profile</p></div><span className="status-badge neutral">{filtered.length} results</span></div>{filtered.length ? <div className="match-job-grid">{filtered.slice(0, 5).map((match) => <JobMatchCard key={match.title + match.company} match={match} trainee={trainee} applications={applications} setApplications={setApplications} onDetails={setSelectedMatch} setToast={setToast} />)}</div> : <div className="panel analytics-empty"><span className="empty-icon">⌁</span><h2>No matching jobs found</h2><p>Try clearing a filter or searching for a broader role, company, location, or skill.</p><button className="secondary-action" type="button" onClick={() => { setSearch(''); setRole('all'); setJobLocation('all'); setExperience('all'); setSalary('all') }}>Reset filters</button></div>}</section>{selectedMatch && <JobMatchDetails match={selectedMatch} trainee={trainee} onClose={() => setSelectedMatch(null)} />}<Toast message={toast} /></>
}

function ApplicationsPage() {
  const location = useLocation()
  const trainee = getActiveJobTrainee(location)
  const [items, setItems] = useState(() => JSON.parse(localStorage.getItem(`eots-applications-${trainee.id}`) || '[]'))
  useEffect(() => { const update = () => setItems(JSON.parse(localStorage.getItem(`eots-applications-${trainee.id}`) || '[]')); window.addEventListener('eots-applications-updated', update); return () => window.removeEventListener('eots-applications-updated', update) }, [trainee.id])
  return <section className="panel table-panel"><div className="panel-heading"><div><span className="section-kicker">Your job search</span><h2>Applications</h2><p className="panel-supporting">Applications for {trainee.name}</p></div><Link className="secondary-action" to={`/trainee/jobs?traineeId=${trainee.id}`}>Find Jobs →</Link></div>{items.length ? <div className="application-list">{items.map((application) => <div className="application-row" key={application.jobId}><span className="application-step">✓</span><div><strong>{application.role}</strong><small>{application.company} · Applied {application.date}</small></div><span className={`status-badge ${application.tone || 'warning'}`}>{application.status}</span><span className="application-arrow">→</span></div>)}</div> : <div className="inline-empty">No applications yet. Find a relevant job to get started.</div>}</section>
}

function JobCard({ job }) {
  const [applied, setApplied] = React.useState(false)
  return <article className="job-card"><div className="job-card-top"><span className="partner-logo">{job[1].slice(0, 2).toUpperCase()}</span><span className="status-badge neutral">New match</span></div><h3>{job[0]}</h3><p>{job[1]} · {job[2]}</p><strong>{job[3]}</strong><div className="skill-list">{job[4].split(' · ').map((skill) => <span key={skill}>{skill}</span>)}</div><button className={`job-apply ${applied ? 'applied' : ''}`} onClick={() => setApplied(true)}>{applied ? 'Application saved ✓' : 'Apply now →'}</button></article>
}

function NavigateTo({ path }) {
  return <Navigate to={path} replace />
}

const analyticsData = {
  all: { rate: 70, placement: 68, salary: 38420, completion: 82, retention: 78, volume: 12480 },
  Noida: { rate: 76, placement: 73, salary: 42400, completion: 88, retention: 82, volume: 4820 },
  Lucknow: { rate: 68, placement: 64, salary: 35100, completion: 79, retention: 74, volume: 2860 },
  Agra: { rate: 72, placement: 69, salary: 37200, completion: 84, retention: 77, volume: 2410 },
  Meerut: { rate: 61, placement: 58, salary: 31800, completion: 73, retention: 69, volume: 1390 },
}

function ReportsInsightsPage() {
  const [filters, setFilters] = useState({ date: 'Q3 2026', district: 'all', program: 'all', status: 'all' })
  const [exporting, setExporting] = useState(false)
  const [toast, setToast] = useState('')
  const selected = analyticsData[filters.district] || analyticsData.all
  const modifier = filters.program === 'Digital Marketing' ? 3 : filters.program === 'Data Analytics' ? 5 : filters.program === 'Healthcare Support' ? -2 : 0
  const statusModifier = filters.status === 'Employed' ? 8 : filters.status === 'Unemployed' ? -18 : filters.status === 'Self-employed' ? 2 : 0
  const metrics = { ...selected, rate: Math.max(0, Math.min(100, selected.rate + modifier + statusModifier)), placement: Math.max(0, Math.min(100, selected.placement + modifier + statusModifier)), completion: Math.max(0, Math.min(100, selected.completion + modifier)), retention: Math.max(0, Math.min(100, selected.retention + modifier)), salary: selected.salary + (filters.program === 'Data Analytics' ? 4200 : filters.program === 'Healthcare Support' ? -2800 : 0) }
  const hasData = filters.status !== 'Unemployed' || filters.district !== 'Meerut'
  const updateFilter = (key, value) => setFilters((current) => ({ ...current, [key]: value }))
  const exportReport = () => { setExporting(true); window.setTimeout(() => { setExporting(false); setToast('Report export initiated successfully'); window.setTimeout(() => setToast(''), 2800) }, 650) }
  const programRates = [['Digital Marketing', 78], ['Data Analytics', 74], ['Healthcare Support', 69], ['Retail Operations', 63]].map(([name, value]) => [name, Math.max(0, Math.min(100, value + modifier + (filters.district === 'Noida' ? 4 : filters.district === 'Meerut' ? -5 : 0)))])
  const districtRates = [['Noida', 76], ['Lucknow', 72], ['Agra', 68], ['Meerut', 61]]
  const salaryBands = [['₹20–30k', 18], ['₹30–40k', 31], ['₹40–50k', 35], ['₹50k+', 16]]
  const monthlyPlacements = [48, 57, 63, 59, 72, 78, 86, 82, 94]
  return <><div className="report-controls analytics-controls"><div className="analytics-filter"><label>Date range<select value={filters.date} onChange={(event) => updateFilter('date', event.target.value)}><option>Q3 2026</option><option>Q2 2026</option><option>Last 12 months</option></select></label><label>District<select value={filters.district} onChange={(event) => updateFilter('district', event.target.value)}><option value="all">All districts</option><option>Bengaluru</option><option>Mysuru</option><option>Mangaluru</option><option>Hubballi</option></select></label><label>Training program<select value={filters.program} onChange={(event) => updateFilter('program', event.target.value)}><option value="all">All programs</option><option>Digital Marketing</option><option>Data Analytics</option><option>Healthcare Support</option><option>Retail Operations</option></select></label><label>Employment status<select value={filters.status} onChange={(event) => updateFilter('status', event.target.value)}><option value="all">All statuses</option><option>Employed</option><option>Unemployed</option><option>Self-employed</option></select></label></div><button className="primary-action" type="button" onClick={exportReport} disabled={exporting}>{exporting ? 'Preparing report…' : 'Export Report ↓'}</button></div>{hasData ? <><div className="stat-grid five analytics-kpis"><StatCard label="Employment rate" value={`${metrics.rate}%`} detail={`${selected.volume.toLocaleString()} trainees`} tone="mint" icon="↗" /><StatCard label="Placement rate" value={`${metrics.placement}%`} detail="+4.8% vs last quarter" tone="lavender" icon="◎" /><StatCard label="Average salary" value={`₹${metrics.salary.toLocaleString()}`} detail="Across employed cohort" tone="peach" icon="₹" /><StatCard label="Training completion" value={`${metrics.completion}%`} detail="Programme completion" tone="sky" icon="◒" /><StatCard label="Retention rate" value={`${metrics.retention}%`} detail="Retained after 6 months" tone="mint" icon="✦" /></div><div className="analytics-grid"><section className="panel analytics-chart wide"><div className="panel-heading"><div><span className="section-kicker">Outcome movement</span><h2>Employment outcomes</h2></div><span className="chart-caption">{filters.date} · {filters.district === 'all' ? 'All districts' : filters.district}</span></div><div className="outcome-bars">{[['Employed', metrics.rate, 'bar-employed'], ['Placed', metrics.placement, 'bar-placed'], ['In training', metrics.completion, 'bar-training'], ['Retained', metrics.retention, 'bar-retained']].map(([label, value, tone]) => <div className="outcome-bar" key={label}><div><span>{label}</span><b>{value}%</b></div><span className="outcome-track"><i className={tone} style={{ width: `${value}%` }}></i></span></div>)}</div></section><section className="panel analytics-chart"><div className="panel-heading"><div><span className="section-kicker">By programme</span><h2>Employment rate</h2></div></div><div className="horizontal-bars">{programRates.map(([label, value]) => <div key={label}><div><span>{label}</span><b>{value}%</b></div><span className="horizontal-track"><i style={{ width: `${value}%` }}></i></span></div>)}</div></section><section className="panel analytics-chart"><div className="panel-heading"><div><span className="section-kicker">Geographic view</span><h2>By district</h2></div></div><div className="district-list">{districtRates.map(([label, value]) => <div key={label}><span className="district-dot"></span><span>{label}</span><b>{value}%</b></div>)}</div><div className="district-note">Bengaluru leads outcomes by 15 points.</div></section><section className="panel analytics-chart"><div className="panel-heading"><div><span className="section-kicker">Compensation</span><h2>Salary distribution</h2></div></div><div className="salary-chart">{salaryBands.map(([label, value]) => <div key={label}><span className="salary-column" style={{ height: `${value * 2.4}%` }}></span><small>{label}</small></div>)}</div><p className="chart-footnote">Average salary <strong>₹{metrics.salary.toLocaleString()}</strong></p></section><section className="panel analytics-chart wide"><div className="panel-heading"><div><span className="section-kicker">Outcome operations</span><h2>Monthly placement trend</h2></div><span className="trend-up">+18.2% this period</span></div><div className="trend-chart">{monthlyPlacements.map((value, index) => <div key={index}><span style={{ height: `${value}%` }}></span><small>{['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'][index]}</small></div>)}</div></section></div><section className="ai-insights"><div className="ai-header"><div><span className="ai-spark">✦</span><div><span className="section-kicker">Decision support</span><h2>AI-Powered Insights</h2></div></div><span className="ai-live">Updated from current filters</span></div><div className="insight-grid"><article className="insight-card high"><div><span className="insight-icon">↗</span><span className="priority">High priority</span></div><h3>Digital Marketing leads outcomes</h3><p>Digital Marketing shows the strongest employment outcome at 78%, outperforming the programme average.</p><strong>Recommendation: expand employer partnerships for the next cohort.</strong></article><article className="insight-card medium"><div><span className="insight-icon">!</span><span className="priority">Needs attention</span></div><h3>Hubballi needs focused support</h3><p>Placement and retention are trailing the network average, with a higher share of unresolved outcomes.</p><strong>Recommendation: schedule a center performance review this month.</strong></article><article className="insight-card positive"><div><span className="insight-icon">₹</span><span className="priority">Positive trend</span></div><h3>Salary growth is accelerating</h3><p>Average salary is up 8.2% year on year, led by analytics and technology placements.</p><strong>Recommendation: prioritize salary benchmarks in employer outreach.</strong></article><article className="insight-card medium"><div><span className="insight-icon">◒</span><span className="priority">Action suggested</span></div><h3>Dropout risk is concentrated early</h3><p>Most inactive records appear before module six, suggesting an opportunity for earlier mentor intervention.</p><strong>Recommendation: add a week-four engagement check-in.</strong></article></div></section></> : <section className="panel analytics-empty"><span className="empty-icon">⌁</span><h2>No matching outcomes</h2><p>Try a broader district or employment status filter to see analytics for this segment.</p><button className="secondary-action" type="button" onClick={() => setFilters({ date: 'Q3 2026', district: 'all', program: 'all', status: 'all' })}>Reset filters</button></section>}<Toast message={toast} /></>
}

function Modal({ title, children, onClose }) {
  return <div className="modal-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onClose()}><section className="modal-dialog" role="dialog" aria-modal="true" aria-labelledby="modal-title"><div className="modal-header"><h2 id="modal-title">{title}</h2><button className="modal-close" type="button" onClick={onClose} aria-label="Close dialog">×</button></div>{children}</section></div>
}

function Toast({ message }) {
  return message ? <div className="success-toast" role="status"><span>✓</span>{message}</div> : null
}

function Field({ label, value, onChange, type = 'text', required = false }) {
  return <label className="modal-field"><span>{label}</span><input type={type} value={value} onChange={(event) => onChange(event.target.value)} required={required} /></label>
}

function downloadCsv(filename, headers, rows) {
  const escape = (value) => `"${String(value).replace(/"/g, '""')}"`
  const csv = [headers, ...rows].map((row) => row.map(escape).join(',')).join('\n')
  const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }))
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  link.click()
  URL.revokeObjectURL(url)
}

const blankCenter = { name: '', location: '', district: '', programs: '', trainees: '', completion: '' }
const blankEmployer = { company: '', industry: '', location: '', jobs: '', status: 'Actively hiring' }
const blankPlacement = { trainee: '', company: '', role: '', salary: '', date: '', location: '', status: 'Placed' }

function TraineesPage() {
  const [search, setSearch] = useState('')
  const [toast, setToast] = useState('')
  const navigate = useNavigate()
  const filtered = traineeRows.filter((row) => `${row.join(' ')} ${traineeDetails[row[0]]?.company || ''}`.toLowerCase().includes(search.toLowerCase()))
  useEffect(() => { const handler = () => { if (!filtered.length) { setToast('No matching trainees to export'); return } downloadCsv('eots-trainees.csv', ['ID', 'Name', 'Training program', 'Center', 'Status', 'Placement'], filtered); setToast('Trainee directory exported successfully'); window.setTimeout(() => setToast(''), 2600) }; window.addEventListener('eots:export-trainees', handler); return () => window.removeEventListener('eots:export-trainees', handler) }, [filtered])
  return <><section className="panel table-panel"><div className="panel-heading"><div><span className="section-kicker">Programme directory</span><h2>Trainees</h2><p className="panel-supporting">Select a trainee to review their progress and placement record.</p></div><Toolbar value={search} onChange={setSearch} placeholder="Search name, ID, program or company" label="Search" /></div>{filtered.length ? <DataTable rows={filtered} headers={['ID', 'Name', 'Training program', 'Center', 'Status', 'Placement']} onRowClick={(row) => navigate(`/gov-officer/trainees/${row[0]}`)} /> : <div className="inline-empty">No trainees match your search. Clear the search to restore the directory.</div>}<div className="table-footnote">Showing {filtered.length} of {traineeRows.length} demo records · Use Export Directory to download the current view</div></section><Toast message={toast} /></>
}

function RiskTraineesPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const params = new URLSearchParams(location.search)
  const priority = getPriorityTrainees()
  const [search, setSearch] = useState('')
  const [risk, setRisk] = useState(params.get('risk') === 'attention' ? 'attention' : 'all')
  const [employment, setEmployment] = useState('all')
  const [program, setProgram] = useState('all')
  const [district, setDistrict] = useState('all')
  const [selected, setSelected] = useState(null)
  const [reviewed, setReviewed] = useState({})
  const [note, setNote] = useState('')
  const [toast, setToast] = useState('')
  const filtered = priority.filter((profile) => { const trainee = profile.trainee; const text = `${trainee.name} ${trainee.id} ${trainee.program} ${trainee.district}`.toLowerCase(); return text.includes(search.toLowerCase()) && (risk === 'all' || (risk === 'attention' ? profile.level !== 'Low' : profile.level === risk)) && (employment === 'all' || trainee.employment === employment) && (program === 'all' || trainee.program === program) && (district === 'all' || trainee.district === district) })
  const selectProfile = (profile) => { setSelected(profile); setNote('') }
  const saveNote = () => { if (!note.trim()) return; setReviewed((current) => ({ ...current, [selected.trainee.id]: true })); setToast('Intervention note added'); setNote(''); window.setTimeout(() => setToast(''), 2600) }
  return <><section className="panel table-panel"><div className="panel-heading"><div><span className="section-kicker">Programme directory</span><h2>Trainees Requiring Attention</h2><p className="panel-supporting">Review deterministic risk signals before a trainee remains unemployed for too long.</p></div><div className="risk-filter-tools"><Toolbar value={search} onChange={setSearch} placeholder="Search trainee, ID, program or district" label="Search" /><select value={risk} onChange={(event) => setRisk(event.target.value)} aria-label="Filter risk level"><option value="all">All risk levels</option><option value="attention">Needs attention</option><option>High</option><option>Medium</option><option>Low</option></select><select value={employment} onChange={(event) => setEmployment(event.target.value)} aria-label="Filter employment status"><option value="all">All employment statuses</option><option>Employed</option><option>Unemployed</option><option>Seeking employment</option></select><select value={program} onChange={(event) => setProgram(event.target.value)} aria-label="Filter training program"><option value="all">All programs</option>{[...new Set(priority.map((profile) => profile.trainee.program))].map((value) => <option key={value}>{value}</option>)}</select><select value={district} onChange={(event) => setDistrict(event.target.value)} aria-label="Filter district"><option value="all">All districts</option>{[...new Set(priority.map((profile) => profile.trainee.district))].map((value) => <option key={value}>{value}</option>)}</select></div></div>{filtered.length ? <div className="risk-table-wrap"><table className="risk-table"><thead><tr><th>Trainee</th><th>Program</th><th>District</th><th>Completion</th><th>Employment</th><th>Risk</th><th>Score</th><th>Primary reason</th><th>Recommended action</th><th></th></tr></thead><tbody>{filtered.map((profile) => <tr key={profile.trainee.id}><td><strong>{profile.trainee.name}</strong><small>{profile.trainee.id}</small></td><td>{profile.trainee.program}</td><td>{profile.trainee.district}</td><td>{profile.trainee.progress}%</td><td>{profile.trainee.employment}</td><td><RiskBadge level={profile.level} /></td><td><strong>{profile.score}</strong></td><td>{profile.reasons[0]}</td><td>{profile.actions[0]}</td><td><button className="row-detail-button" type="button" onClick={() => selectProfile(profile)}>View Details</button></td></tr>)}</tbody></table></div> : <div className="inline-empty">No trainees match these risk filters. Try clearing a filter to restore the list.</div>}<div className="table-footnote">Showing {filtered.length} of {priority.length} deterministic demo risk profiles</div></section><Toast message={toast} />{selected && <RiskDetailModal profile={selected} onClose={() => setSelected(null)} reviewed={reviewed[selected.trainee.id]} note={note} setNote={setNote} onReviewed={() => setReviewed((current) => ({ ...current, [selected.trainee.id]: true }))} onSaveNote={saveNote} />}</>
}

function CentersPage() {
  const [centers, setCenters] = useState(centerRows.map(([name, location, programs, trainees, completion, performance]) => ({ name, location, district: location, programs, trainees, completion: completion.replace('%', ''), performance })))
  const [search, setSearch] = useState('')
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState(blankCenter)
  const [toast, setToast] = useState('')
  useEffect(() => { const handler = () => setOpen(true); window.addEventListener('eots:open-center', handler); return () => window.removeEventListener('eots:open-center', handler) }, [])
  const update = (key, value) => setForm((current) => ({ ...current, [key]: value }))
  const filtered = centers.filter((center) => Object.values(center).join(' ').toLowerCase().includes(search.toLowerCase()))
  const addCenter = (event) => { event.preventDefault(); setCenters((current) => [{ ...form, performance: Number(form.completion) >= 80 ? 'High' : 'Watch' }, ...current]); setForm(blankCenter); setOpen(false); setToast('Training center added successfully'); window.setTimeout(() => setToast(''), 2600) }
  return <><section className="panel table-panel"><div className="panel-heading"><div><span className="section-kicker">Programme network</span><h2>Training Centers</h2></div><Toolbar value={search} onChange={setSearch} placeholder="Search centers" label="Search" /></div>{filtered.length ? <DataTable rows={filtered.map((center) => [center.name, center.location, center.programs, center.trainees, `${center.completion}%`, center.performance])} headers={['Center', 'Location', 'Programs', 'Trainees', 'Completion', 'Performance']} /> : <div className="inline-empty">No training centers found. Clear the search to see all centers.</div>}</section><Toast message={toast} />{open && <Modal title="Add Training Center" onClose={() => setOpen(false)}><form className="modal-form" onSubmit={addCenter}><div className="modal-grid"><Field label="Center Name" value={form.name} onChange={(value) => update('name', value)} required /><Field label="Location" value={form.location} onChange={(value) => update('location', value)} required /><Field label="District" value={form.district} onChange={(value) => update('district', value)} required /><Field label="Programs" value={form.programs} onChange={(value) => update('programs', value)} required /><Field label="Number of Trainees" value={form.trainees} onChange={(value) => update('trainees', value)} required /><Field label="Completion Rate" value={form.completion} onChange={(value) => update('completion', value)} required /></div><div className="modal-actions"><button className="modal-cancel" type="button" onClick={() => setOpen(false)}>Cancel</button><button className="primary-action" type="submit">Add Center</button></div></form></Modal>}</>
}

function EmployersPage() {
  const [employers, setEmployers] = useState(employerRows.map(([company, industry, jobs, hires, status]) => ({ company, industry, location: 'Noida', jobs, hires, status })))
  const [search, setSearch] = useState('')
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState(blankEmployer)
  const [toast, setToast] = useState('')
  useEffect(() => { const handler = () => setOpen(true); window.addEventListener('eots:open-employer', handler); return () => window.removeEventListener('eots:open-employer', handler) }, [])
  const update = (key, value) => setForm((current) => ({ ...current, [key]: value }))
  const filtered = employers.filter((employer) => Object.values(employer).join(' ').toLowerCase().includes(search.toLowerCase()))
  const addEmployer = (event) => { event.preventDefault(); setEmployers((current) => [{ ...form, jobs: `${form.jobs} open jobs`, hires: '0 hires' }, ...current]); setForm(blankEmployer); setOpen(false); setToast('Employer added successfully'); window.setTimeout(() => setToast(''), 2600) }
  return <><section className="panel table-panel"><div className="panel-heading"><div><span className="section-kicker">Employer network</span><h2>Partner Employers</h2></div><Toolbar value={search} onChange={setSearch} placeholder="Search companies" label="Search" /></div>{filtered.length ? <DataTable rows={filtered.map((employer) => [employer.company, employer.industry, employer.jobs, employer.hires, employer.status])} headers={['Company', 'Industry', 'Open jobs', 'Hires', 'Hiring status']} /> : <div className="inline-empty">No employers found. Clear the search to see all employers.</div>}</section><Toast message={toast} />{open && <Modal title="Add Employer" onClose={() => setOpen(false)}><form className="modal-form" onSubmit={addEmployer}><div className="modal-grid"><Field label="Company Name" value={form.company} onChange={(value) => update('company', value)} required /><Field label="Industry" value={form.industry} onChange={(value) => update('industry', value)} required /><Field label="Location" value={form.location} onChange={(value) => update('location', value)} required /><Field label="Open Jobs" value={form.jobs} onChange={(value) => update('jobs', value)} required /><label className="modal-field modal-field-wide"><span>Hiring Status</span><select value={form.status} onChange={(event) => update('status', event.target.value)}><option>Actively hiring</option><option>Limited hiring</option><option>Not hiring</option></select></label></div><div className="modal-actions"><button className="modal-cancel" type="button" onClick={() => setOpen(false)}>Cancel</button><button className="primary-action" type="submit">Add Employer</button></div></form></Modal>}</>
}

function PlacementsPage() {
  const initial = placements.concat([['Neha Joshi', 'Healthcare Support', 'Meridian Health', '₹36,000', '28 Aug']]).map((row, index) => ({ id: `PL-${2048 - index}`, trainee: row[0], role: row[1], company: row[2], salary: row[3], date: row[4], location: 'Noida', status: 'Placed' }))
  const [records, setRecords] = useState(initial)
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('all')
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState(blankPlacement)
  const [toast, setToast] = useState('')
  useEffect(() => { const handler = () => setOpen(true); window.addEventListener('eots:open-placement', handler); return () => window.removeEventListener('eots:open-placement', handler) }, [])
  const update = (key, value) => setForm((current) => ({ ...current, [key]: value }))
  const filtered = records.filter((record) => (!status || status === 'all' || record.status === status) && Object.values(record).join(' ').toLowerCase().includes(search.toLowerCase()))
  const addPlacement = (event) => { event.preventDefault(); setRecords((current) => [{ ...form, id: `PL-${Date.now()}`, date: form.date || 'Today' }, ...current]); setForm(blankPlacement); setOpen(false); setToast('Placement recorded successfully'); window.setTimeout(() => setToast(''), 2600) }
  return <><section className="panel table-panel"><div className="panel-heading"><div><span className="section-kicker">Outcome operations</span><h2>Placement register</h2></div><div className="table-tools"><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search placements" aria-label="Search placements" /><select value={status} onChange={(event) => setStatus(event.target.value)} aria-label="Filter placement status"><option value="all">All statuses</option><option>Placed</option><option>Pending</option></select>{search && <button type="button" onClick={() => setSearch('')}>Clear</button>}</div></div>{filtered.length ? <DataTable rows={filtered.map((record) => [record.id, record.trainee, record.company, record.role, record.salary, record.date, record.status])} headers={['ID', 'Trainee', 'Company', 'Role', 'Salary', 'Date', 'Status']} /> : <div className="inline-empty">No placements match these filters.</div>}</section><Toast message={toast} />{open && <Modal title="Record Placement" onClose={() => setOpen(false)}><form className="modal-form" onSubmit={addPlacement}><div className="modal-grid"><Field label="Trainee" value={form.trainee} onChange={(value) => update('trainee', value)} required /><Field label="Company" value={form.company} onChange={(value) => update('company', value)} required /><Field label="Job Role" value={form.role} onChange={(value) => update('role', value)} required /><Field label="Salary" value={form.salary} onChange={(value) => update('salary', value)} required /><Field label="Joining Date" type="date" value={form.date} onChange={(value) => update('date', value)} required /><Field label="Location" value={form.location} onChange={(value) => update('location', value)} required /><label className="modal-field modal-field-wide"><span>Placement Status</span><select value={form.status} onChange={(event) => update('status', event.target.value)}><option>Placed</option><option>Pending</option></select></label></div><div className="modal-actions"><button className="modal-cancel" type="button" onClick={() => setOpen(false)}>Cancel</button><button className="primary-action" type="submit">Record Placement</button></div></form></Modal>}</>
}

const courses = [['Advanced Data Analytics', 'SQL · Power BI · Excel', '12 weeks', 'Intermediate', 'Government ITI Ghaziabad', 'Build practical reporting and analysis skills for analyst roles.'], ['Web Development Foundations', 'HTML · CSS · JavaScript', '16 weeks', 'Beginner', 'Government ITI Noida', 'Create responsive websites and prepare for junior developer roles.'], ['Customer Support Excellence', 'Communication · CRM · Service', '8 weeks', 'Beginner', 'Skill Development Center Lucknow', 'Develop workplace skills for customer support and operations careers.']]

function TrainingPage() {
  const [search, setSearch] = useState('')
  const [open, setOpen] = useState(false)
  const filtered = courses.filter((course) => course.join(' ').toLowerCase().includes(search.toLowerCase()))
  useEffect(() => { const handler = () => setOpen(true); window.addEventListener('eots:open-courses', handler); return () => window.removeEventListener('eots:open-courses', handler) }, [])
  return <><section className="panel course-hero"><div><span className="section-kicker">Current programme</span><h2>Digital Marketing Executive</h2><p>Government ITI Noida · Cohort 2025 · 25 modules</p></div><Donut value={72} label="complete" /></section><div className="panel training-search"><Toolbar value={search} onChange={setSearch} placeholder="Search courses, skills or programs" label="Search" /></div><div className="module-grid">{['Marketing foundations', 'Content & social strategy', 'Search engine marketing', 'Campaign measurement'].filter((item) => item.toLowerCase().includes(search.toLowerCase())).map((item, i) => <div className="module-card" key={item}><span className={`module-number ${i < 3 ? 'done' : ''}`}>{i < 3 ? '✓' : `0${i + 1}`}</span><div><strong>{item}</strong><small>{i < 3 ? 'Completed' : 'Up next · 20 min'}</small></div><span>→</span></div>)}</div>{open && <Modal title="Browse courses" onClose={() => setOpen(false)}><div className="course-browser">{filtered.length ? filtered.map((course) => <article className="course-card" key={course[0]}><div><span className="status-badge neutral">{course[3]}</span><h3>{course[0]}</h3><p>{course[5]}</p></div><div className="course-meta"><span>{course[1]}</span><span>{course[2]} · {course[4]}</span></div><button className="secondary-action" type="button" onClick={() => setOpen(false)}>Explore course →</button></article>) : <div className="inline-empty">No courses found. Clear the search to browse all options.</div>}</div></Modal>}</>
}

const blankExperience = { company: '', role: '', type: 'Full-time', location: '', start: '', end: '', salary: '' }

function EmploymentHistoryPage() {
  const [experiences, setExperiences] = useState([
    { ...blankExperience, company: 'SkillForge Institute', role: 'Digital Marketing trainee', location: 'Bengaluru', start: '2026-04-01', end: '', salary: '₹18,000 / month' },
    { ...blankExperience, company: 'Northstar Retail', role: 'Customer experience intern', location: 'Bengaluru', start: '2025-06-01', end: '2025-12-01', salary: '₹15,000 / month' },
  ])
  const [isOpen, setIsOpen] = useState(false)
  const [form, setForm] = useState(blankExperience)
  const [toast, setToast] = useState('')
  useEffect(() => { const open = () => setIsOpen(true); window.addEventListener('eots:open-experience', open); return () => window.removeEventListener('eots:open-experience', open) }, [])
  const update = (key, value) => setForm((current) => ({ ...current, [key]: value }))
  const addExperience = (event) => {
    event.preventDefault()
    setExperiences((current) => [{ ...form }, ...current])
    setForm(blankExperience)
    setIsOpen(false)
    setToast('Experience added successfully')
    window.setTimeout(() => setToast(''), 2600)
  }
  return <><section className="panel table-panel"><div className="panel-heading"><div><span className="section-kicker">Work record</span><h2>Experience timeline</h2></div><button className="secondary-action" type="button" onClick={() => setIsOpen(true)}>+ Add experience</button></div><div className="timeline">{experiences.map((experience, index) => <div key={`${experience.company}-${index}`}><span>{experience.start ? experience.start.slice(0, 4) : 'Current'}</span><article><strong>{experience.role}</strong><small>{experience.company} · {experience.start || 'Start date'} – {experience.end || 'Present'} · {experience.type}</small><p>{experience.location}{experience.salary ? ` · ${experience.salary}` : ''}</p></article></div>)}</div></section><Toast message={toast} />{isOpen && <Modal title="Add experience" onClose={() => setIsOpen(false)}><form className="modal-form" onSubmit={addExperience}><div className="modal-grid"><Field label="Company Name" value={form.company} onChange={(value) => update('company', value)} required /><Field label="Job Role" value={form.role} onChange={(value) => update('role', value)} required /><label className="modal-field"><span>Employment Type</span><select value={form.type} onChange={(event) => update('type', event.target.value)}><option>Full-time</option><option>Part-time</option><option>Contract</option><option>Internship</option></select></label><Field label="Location" value={form.location} onChange={(value) => update('location', value)} required /><Field label="Start Date" type="date" value={form.start} onChange={(value) => update('start', value)} required /><Field label="End Date" type="date" value={form.end} onChange={(value) => update('end', value)} /><Field label="Salary" value={form.salary} onChange={(value) => update('salary', value)} /></div><div className="modal-actions"><button className="modal-cancel" type="button" onClick={() => setIsOpen(false)}>Cancel</button><button className="primary-action" type="submit">Add Experience</button></div></form></Modal>}</>
}

const statusDefaults = { status: 'Employed', company: '', role: '', salary: '', joiningDate: '', location: '', reason: '', workType: '', course: '', institution: '' }

function EmploymentStatusPage() {
  const [status, setStatus] = useState('Active search')
  const [details, setDetails] = useState({ ...statusDefaults, company: 'TCS', role: 'Digital Marketing Executive', salary: '₹42,000 / month', joiningDate: '2026-09-06', location: 'Noida' })
  const [isOpen, setIsOpen] = useState(false)
  const [form, setForm] = useState({ ...details, status: 'Employed' })
  const [toast, setToast] = useState('')
  useEffect(() => { const open = () => setIsOpen(true); window.addEventListener('eots:open-status', open); return () => window.removeEventListener('eots:open-status', open) }, [])
  const update = (key, value) => setForm((current) => ({ ...current, [key]: value }))
  const saveStatus = (event) => {
    event.preventDefault()
    setDetails({ ...form })
    setStatus(form.status)
    setIsOpen(false)
    setToast('Employment status updated successfully')
    window.setTimeout(() => setToast(''), 2600)
  }
  const extraFields = form.status === 'Employed' ? <><Field label="Company Name" value={form.company} onChange={(value) => update('company', value)} required /><Field label="Job Role" value={form.role} onChange={(value) => update('role', value)} required /><Field label="Salary" value={form.salary} onChange={(value) => update('salary', value)} required /><Field label="Joining Date" type="date" value={form.joiningDate} onChange={(value) => update('joiningDate', value)} required /><Field label="Location" value={form.location} onChange={(value) => update('location', value)} required /></> : form.status === 'Unemployed' ? <Field label="Reason for Unemployment" value={form.reason} onChange={(value) => update('reason', value)} required /> : form.status === 'Self-Employed' ? <><Field label="Business / Work Type" value={form.workType} onChange={(value) => update('workType', value)} required /><Field label="Location" value={form.location} onChange={(value) => update('location', value)} required /></> : <><Field label="Course / Program" value={form.course} onChange={(value) => update('course', value)} required /><Field label="Institution" value={form.institution} onChange={(value) => update('institution', value)} required /></>
  return <><div className="stat-grid three"><StatCard label="Current status" value={status} detail="Updated just now" tone="mint" icon="↗" /><StatCard label="Applications" value="06" detail="2 in interview stage" tone="lavender" icon="◎" /><StatCard label="Profile visibility" value="86%" detail="Strong candidate profile" tone="sky" icon="✦" /></div><section className="panel status-panel"><div className="panel-heading"><div><span className="section-kicker">Your pipeline</span><h2>Placement journey</h2></div><button className="secondary-action" type="button" onClick={() => { setForm({ ...details, status: details.status === 'Active search' ? 'Employed' : details.status }); setIsOpen(true) }}>Update status</button></div><div className="journey"><div className="journey-step complete"><span>✓</span><strong>Training complete</strong><small>25 Aug 2026</small></div><div className="journey-step complete"><span>✓</span><strong>Profile verified</strong><small>27 Aug 2026</small></div><div className="journey-step current"><span>3</span><strong>{status === 'Employed' ? 'Employed' : 'Employment search'}</strong><small>{details.company || 'Update your current status'}</small></div><div className="journey-step"><span>4</span><strong>Next milestone</strong><small>{details.role || 'Add status details'}</small></div></div><div className="snapshot-fields status-details"><div><small>Status</small><strong>{status}</strong></div><div><small>Company / program</small><strong>{details.company || details.course || details.institution || 'Not added'}</strong></div><div><small>Role / focus</small><strong>{details.role || details.workType || 'Not added'}</strong></div><div><small>Salary / location</small><strong>{details.salary || details.location || 'Not added'}</strong></div></div></section><Toast message={toast} />{isOpen && <Modal title="Update employment status" onClose={() => setIsOpen(false)}><form className="modal-form" onSubmit={saveStatus}><label className="modal-field"><span>Employment Status</span><select value={form.status} onChange={(event) => update('status', event.target.value)}><option>Employed</option><option>Unemployed</option><option>Self-Employed</option><option>Further Education</option></select></label><div className="modal-grid">{extraFields}</div><div className="modal-actions"><button className="modal-cancel" type="button" onClick={() => setIsOpen(false)}>Cancel</button><button className="primary-action" type="submit">Save status</button></div></form></Modal>}</>
}

function ProfilePage() {
  const [profile, setProfile] = useState({ name: 'Aarav Mehta', phone: '+91 98765 43210', email: 'aarav.mehta@example.com', education: 'BBA, Bengaluru University', skills: 'SEO · Content · Analytics' })
  const [draft, setDraft] = useState(profile)
  const [isOpen, setIsOpen] = useState(false)
  const [toast, setToast] = useState('')
  useEffect(() => { const open = () => { setDraft(profile); setIsOpen(true) }; window.addEventListener('eots:open-profile', open); return () => window.removeEventListener('eots:open-profile', open) }, [profile])
  const update = (key, value) => setDraft((current) => ({ ...current, [key]: value }))
  const saveProfile = (event) => { event.preventDefault(); setProfile({ ...draft }); setIsOpen(false); setToast('Profile updated successfully'); window.setTimeout(() => setToast(''), 2600) }
  return <><section className="panel profile-card"><div className="profile-large"><span className="avatar large">AM</span><div><h2>{profile.name}</h2><p>Digital Marketing Professional</p><span className="status-badge success">Profile verified</span></div><button className="secondary-action profile-edit" type="button" onClick={() => { setDraft(profile); setIsOpen(true) }}>Edit profile</button></div><div className="profile-fields"><div><small>Email address</small><strong>{profile.email}</strong></div><div><small>Phone number</small><strong>{profile.phone}</strong></div><div><small>Education</small><strong>{profile.education}</strong></div><div><small>Location</small><strong>Bengaluru, Karnataka</strong></div><div><small>Skills</small><strong>{profile.skills}</strong></div><div><small>Preferred role</small><strong>Digital marketing associate</strong></div></div></section><Toast message={toast} />{isOpen && <Modal title="Edit profile" onClose={() => setIsOpen(false)}><form className="modal-form" onSubmit={saveProfile}><div className="modal-grid"><Field label="Name" value={draft.name} onChange={(value) => update('name', value)} required /><Field label="Phone" value={draft.phone} onChange={(value) => update('phone', value)} required /><Field label="Email" type="email" value={draft.email} onChange={(value) => update('email', value)} required /><Field label="Education" value={draft.education} onChange={(value) => update('education', value)} required /><label className="modal-field modal-field-wide"><span>Skills</span><textarea value={draft.skills} onChange={(event) => update('skills', event.target.value)} required /></label></div><div className="modal-actions"><button className="modal-cancel" type="button" onClick={() => setIsOpen(false)}>Cancel</button><button className="primary-action" type="submit">Save changes</button></div></form></Modal>}</>
}

function TraineePage({ page }) {
  if (page === 'employment') return <EmploymentStatusPage />
  if (page === 'history') return <EmploymentHistoryPage />
  if (page === 'profile') return <ProfilePage />
  return <TraineeLegacyPage page={page} />
}

function TraineeLegacyPage({ page }) {
  if (page === 'dashboard') return <TraineeDashboard />
  if (page === 'training') return <TrainingPage />
  if (page === 'jobs') return <JobOpportunitiesPage />
  if (page === 'applications') return <ApplicationsPage />
  if (page === 'employment') return <><div className="stat-grid three"><StatCard label="Current status" value="Active search" detail="Updated 02 Sep 2026" tone="mint" icon="↗" /><StatCard label="Applications" value="06" detail="2 in interview stage" tone="lavender" icon="◎" /><StatCard label="Profile visibility" value="86%" detail="Strong candidate profile" tone="sky" icon="✦" /></div><section className="panel status-panel"><div className="panel-heading"><div><span className="section-kicker">Your pipeline</span><h2>Placement journey</h2></div><span className="status-badge warning">In progress</span></div><div className="journey"><div className="journey-step complete"><span>✓</span><strong>Training complete</strong><small>25 Aug 2026</small></div><div className="journey-step complete"><span>✓</span><strong>Profile verified</strong><small>27 Aug 2026</small></div><div className="journey-step current"><span>3</span><strong>Employer interviews</strong><small>2 active applications</small></div><div className="journey-step"><span>4</span><strong>Offer received</strong><small>Next milestone</small></div></div></section></>
  if (page === 'history') return <section className="panel table-panel"><div className="panel-heading"><div><span className="section-kicker">Work record</span><h2>Experience timeline</h2></div><Link className="secondary-action" to="/trainee/history">+ Add experience</Link></div><div className="timeline"><div><span>2026</span><article><strong>Digital Marketing trainee</strong><small>SkillForge Institute · Apr 2026 – Present</small><p>Built campaign plans and analysed performance for live partner briefs.</p></article></div><div><span>2025</span><article><strong>Customer experience intern</strong><small>Northstar Retail · Jun 2025 – Dec 2025</small><p>Supported customer research and improved weekly feedback reporting.</p></article></div></div></section>
  return <section className="panel profile-card"><div className="profile-large"><span className="avatar large">AM</span><div><h2>Aarav Mehta</h2><p>Digital Marketing Professional</p><span className="status-badge success">Profile verified</span></div><button className="secondary-action profile-edit">Edit profile</button></div><div className="profile-fields"><div><small>Email address</small><strong>aarav.mehta@example.com</strong></div><div><small>Phone number</small><strong>+91 98765 43210</strong></div><div><small>Education</small><strong>BBA, Bengaluru University</strong></div><div><small>Location</small><strong>Bengaluru, Karnataka</strong></div><div><small>Skills</small><strong>SEO · Content · Analytics</strong></div><div><small>Preferred role</small><strong>Digital marketing associate</strong></div></div></section>
}

function OfficerPage({ page }) {
  const navigate = useNavigate()
  const { traineeId } = useParams()
  if (page === 'dashboard') return <OfficerDashboard />
  if (page === 'reports-insights') return <ReportsInsightsPage />
  if (page === 'trainees') return <RiskTraineesPage />
  if (page === 'trainee-detail') return traineeDetails[traineeId] ? <TraineeDetail trainee={traineeDetails[traineeId]} /> : <section className="panel analytics-empty"><span className="empty-icon">?</span><h2>Trainee record not found</h2><p>This trainee ID is not available in the current demo data.</p><Link className="secondary-action" to="/gov-officer/trainees">Return to trainees</Link></section>
  if (page === 'centers') return <CentersPage />
  if (page === 'employer-detail') return <DetailPanel title="Nimble Systems" subtitle="Technology · Bengaluru · Partner since 2022" backPath="/gov-officer/employers" fields={[["Hiring status", "Actively hiring"], ["Open roles", "12 positions"], ["Hires this year", "48 trainees"], ["Primary sectors", "Technology · Data · Product"], ["Average salary", "₹48,500 / month"], ["Partnership lead", "Kavya Menon"]]} />
  if (page === 'beneficiaries') return <NavigateTo path="/gov-officer/trainees" />
  if (page === 'institutions') return <NavigateTo path="/gov-officer/centers" />
  if (page === 'employers') return <EmployersPage />
  if (page === 'placements') return <PlacementsPage />
  return <><div className="report-controls"><Toolbar placeholder="01 Jul 2026 — 04 Sep 2026" label="Quarter ▾" /><button className="primary-action">Export report <span>↓</span></button></div><div className="report-grid"><div className="report-highlight"><span className="section-kicker">Quarterly outcome report</span><h2>Q3 Employment Outcomes</h2><p>01 Jul – 30 Sep 2026 · Last generated 04 Sep 2026</p><button className="secondary-action">Download PDF ↓</button></div><div className="report-card"><span className="section-kicker">Placement rate</span><strong>70.0%</strong><small>+4.8% vs previous quarter</small><div className="report-line"><span></span></div></div><div className="report-card"><span className="section-kicker">Average salary</span><strong>₹38,420</strong><small>+8.2% year on year</small><div className="report-line lilac"><span></span></div></div></div><section className="panel chart-panel"><div className="panel-heading"><div><span className="section-kicker">Trend analysis</span><h2>Employment outcomes</h2></div></div><MiniBars /></section><div className="stat-grid three insight-stats"><StatCard label="Training completion" value="82.4%" detail="+5.1% this quarter" tone="mint" icon="◒" /><StatCard label="Women employed" value="54.8%" detail="Of all placements" tone="lavender" icon="◎" /><StatCard label="Salary growth" value="8.2%" detail="Year on year" tone="sky" icon="↗" /></div></>
}

function DirectoryPage({ title, kicker, items }) {
  return <section className="panel directory-panel"><div className="panel-heading"><div><span className="section-kicker">{kicker}</span><h2>{title}</h2></div><div className="table-tools"><input placeholder="Search directory" /><button>Filter</button></div></div><div className="directory-list">{items.map(([name, detail, count, initials]) => <div className="directory-row" key={name}><span className="partner-logo">{initials}</span><div><strong>{name}</strong><small>{detail}</small></div><span className="directory-count">{count}</span><button className="row-arrow">→</button></div>)}</div></section>
}

function RolePage({ role, page }) {
  const data = role === 'trainee' ? traineeData[page] : officerData[page]
  return <><PageHeader data={data} />{role === 'trainee' ? <TraineePage page={page} /> : <OfficerPage page={page} />}</>
}

export default RolePage
