import { resumeData } from './resumeData.js'

function Section({ title, children, className = '' }) {
	return (
		<section className={`resume-section ${className}`}>
			<h2 className="section-title">{title}</h2>
			{children}
		</section>
	)
}

function BulletList({ items }) {
	return (
		<ul className="bullet-list">
			{items.map((item) => <li key={item}>{item}</li>)}
		</ul>
	)
}

function EntryHeading({ title, dates }) {
	return (
		<div className="entry-heading">
			<h3>{title}</h3>
			{dates && <span className="entry-dates">{dates}</span>}
		</div>
	)
}

function App() {
	const { contact, photoUrl } = resumeData

	return (
		<>
			<div className="print-toolbar" aria-label="Resume actions">
				<span>Resume preview</span>
				<button type="button" onClick={() => window.print()}>Print / Save as PDF</button>
			</div>

			<main className="resume-sheet">
				<header className="resume-header">
					<div className="header-copy">
						<h1>{resumeData.name}</h1>
						<p className="professional-title">{resumeData.title}</p>
						<address className="contact-details" aria-label="Contact information">
							<a href={`tel:${contact.phone}`}><span aria-hidden="true">☎</span>{contact.phone}</a>
							<a href={`mailto:${contact.email}`}><span aria-hidden="true">✉</span>{contact.email}</a>
							{contact.profiles.map((profile) => (
								<a key={profile.label} href={profile.url} target="_blank" rel="noreferrer">
									<span aria-hidden="true">↗</span>{profile.url.replace(/^https:\/\//, '')}
								</a>
							))}
						</address>
					</div>
					<div className="photo-frame" aria-label={photoUrl ? 'Profile photo' : 'Profile photo placeholder'}>
						{photoUrl ? <img src={photoUrl} alt={`${resumeData.name} profile`} /> : <span className="avatar-silhouette" aria-hidden="true" />}
					</div>
				</header>

				<div className="resume-columns">
					<div className="primary-column">
						<Section title="Experience">
							{resumeData.responsibilities.map((item) => (
								<article className="resume-entry" key={`${item.role}-${item.organization}`}>
									<EntryHeading title={item.role} />
									<p className="accent-text institution">{item.organization}</p>
									<BulletList items={item.bullets} />
								</article>
							))}
						</Section>

						<Section title="Education">
							{resumeData.education.map((item) => (
								<article className="resume-entry" key={item.degree}>
									<div className="education-copy">
										<EntryHeading title={item.degree} />
										<p className="accent-text institution">{item.institution}</p>
										{(item.dates || item.location || item.board) && (
											<p className="education-details">
												{item.dates && <span>▦ {item.dates}</span>}
												{item.location && <span>⌖ {item.location}</span>}
												{item.board && <span>• {item.board}</span>}
											</p>
										)}
										{item.details?.length > 0 && <p className="education-details">• {item.details.join('  ·  ')}</p>}
									</div>
									{item.result && (
										<div className="education-result">
											<span>{item.result.label}</span>
											<strong>{item.result.value}</strong> {item.result.scale}
										</div>
									)}
								</article>
							))}
						</Section>

						<Section title="Projects">
							{resumeData.projects.map((project) => (
								<article className="resume-entry" key={project.name}>
									<EntryHeading title={project.name} />
									<BulletList items={project.bullets} />
								</article>
							))}
						</Section>

						<Section title="Achievements" className="last-section">
							<BulletList items={resumeData.achievements} />
						</Section>
					</div>

					<aside className="sidebar" aria-label="Summary, technical skills, and certifications">
						<Section title="Professional Summary">
							<p className="summary-text">{resumeData.summary}</p>
						</Section>

						<Section title="Skills">
							<div className="skill-list">
								{resumeData.skills.map((skill) => (
									<div className="skill-group" key={skill.category}>
										<h3>{skill.category}</h3>
										<div className="skill-tags">
											{skill.items.map((item) => <span key={item}>{item}</span>)}
										</div>
									</div>
								))}
							</div>
						</Section>

						<Section title="Certifications" className="certifications-section">
							{resumeData.certifications.map((item) => (
								<article className="resume-entry" key={item.name}>
									<EntryHeading title={item.name} dates={item.dates} />
									{item.organization && <p className="certification-organization">{item.organization}</p>}
									<BulletList items={item.bullets} />
								</article>
							))}
						</Section>
					</aside>
				</div>
				<footer className="resume-footer">Khushi Kumari <span>·</span> Resume</footer>
			</main>
		</>
	)
}

export default App
