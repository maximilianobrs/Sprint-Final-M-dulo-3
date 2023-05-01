String.prototype.replaceEnter = function ($replace = '') {
  return this.replace(/^\s+|\s+$/gm, '').split('\n').join($replace);
};
replaceEnter = function (str,$replace = '') {
  return str.replace(/^\s+|\s+$/gm, '').split('\n').join($replace);
};
const ModalOwner = (props) => {
  let { content, id, titulo='' } = props
  content = content + "";
  const modalReturn = ` 
	<div class="modal fade" id="${id}" tabindex="-1" aria-labelledby="${id}" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<h1 class="modal-title fs-5" id="ads">${titulo}</h1>
					<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
				</div>
				<div class="modal-body">
					
        ${content.replaceEnter()}
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button> 
				</div>
			</div>
		</div>
	</div>
  `
  return modalReturn;
}; 