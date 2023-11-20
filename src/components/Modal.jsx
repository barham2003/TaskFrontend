export default function Modal({ children, title = "" }) {
	return (
		<>
			<div className={`absolute inset-0 bg-new `}>
				<div className={`${title ? "pt-8" : ""} modal relative p-4`}>
					{title && (
						<div className="modal-title">
							<h1 className="text-2xl font-bold">{title}</h1>
						</div>
					)}
					{children}
				</div>
			</div>
		</>
	)
}
