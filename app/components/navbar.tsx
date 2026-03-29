import { History, Logout, Person } from "@mui/icons-material";
import { MenuItem } from "@mui/material";
import { useState } from "react";
import type { UserProps } from "~/type";

export default function Navbar({ user }: { user?: UserProps }) {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const [open, setOpen] = useState(false);

	const menu = [
		{
			label: "Profile",
			icon: <Person />,
			onClick: () => {
				setOpen(false);
			},
		},
		{
			label: "Riwayat Transaksi",
			icon: <History />,
			onClick: () => {
				setOpen(false);
			},
		},
		{
			label: "Logout",
			icon: <Logout />,
			onClick: () => {
				localStorage.removeItem("user");
				window.location.href = "/login";
			},
		},
	];

	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
		setOpen((prev) => !prev);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};
	const handleLogout = () => {
		localStorage.removeItem("user");
		window.location.href = "/login";
	};

	const initial = user?.name?.trim()?.charAt(0)?.toUpperCase() || "U";

	return (
		<div className="max-w-6xl mx-auto w-full">
			<nav className="fixed top-0 z-20 mt-4 max-w-6xl w-full rounded-full border border-white/30 bg-linear-to-r from-slate-200 via-slate-100 to-slate-200 px-4 py-3 text-slate-900 shadow-sm backdrop-blur">
				<div className="flex items-center justify-between gap-4">
					<a href="/" className="group inline-flex items-center gap-3">
						<span className="grid h-10 w-10 place-items-center rounded-full bg-linear-to-br from-amber-400 to-orange-500 text-sm font-bold text-slate-900 shadow-lg transition-transform group-hover:scale-105">
							EC
						</span>
						<div className="leading-tight">
							<p className="text-base font-semibold tracking-wide">
								E-Commerce
							</p>
							<p className="text-xs text-slate-600">
								Smart shopping starts here
							</p>
						</div>
					</a>

					{user?.name ? (
						<div className="flex items-center gap-2">
							<button
								type="button"
								id="basic-button"
								onClick={handleClick}
								className="flex  items-center gap-2 rounded-full border border-gray-300 px-3 py-1 text-sm font-medium text-slate-700 transition ring-2  ring-orang-200 hover:ring-orange-400 focus:ring-orange-400">
								<span className="grid h-7 w-7 place-items-center rounded-full bg-orange-300 font-semibold text-slate-900">
									{initial}
								</span>
								<span className="max-w-32 truncate">Hi, {user.name}</span>
							</button>

							{open && (
								<div
									className="fixed z-10 right-0 top-14 "
									onClick={handleClose}>
									<div
										className="bg-slate-100 rounded-2xl py-1"
										onClick={handleClose}>
										{menu.map((item) => (
											<div
												key={item.label}
												onClick={() => {
													item.onClick();
													handleClose();
												}}
												className="flex gap-2 h-10 m-4 px-1 items-center hover:bg-slate-200">
												{item.icon}
												<p>{item.label}</p>
											</div>
										))}
									</div>
								</div>
							)}
							{/* <Menu
                                id="basic-menu"
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleClose}
                                slotProps={{
                                    list: {
                                        "aria-labelledby": "basic-button",
                                    },
                                    paper: {
                                        sx: {
                                            borderRadius: 3,
                                            border: "1px solid #e2e8f0",
                                            boxShadow: "0 10px 35px rgba(15, 23, 42, 0.2)",
                                            mt: 1,
                                        },
                                    },
                                }}
                            >
                                <MenuItem onClick={handleClose}>Profile</MenuItem>
                                <MenuItem onClick={handleLogout}>Logout</MenuItem>
                            </Menu> */}
						</div>
					) : (
						<div className="flex items-center">
							<a
								href="/register"
								className="rounded-l-full border border-black/20 pl-4 pr-2 py-2 text-sm font-medium text-slate-600 transition hover:bg-white/10">
								Register
							</a>
							<a
								href="/login"
								className="rounded-r-full bg-orange-400 border border-orange-400/20 px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-orange-500">
								Login
							</a>
						</div>
					)}
				</div>
			</nav>
		</div>
	);
}
