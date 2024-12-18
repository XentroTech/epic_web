// confirmation modal

  
  
    const [modalOpen, setModalOpen] = useState(false);
    const [imageToDelete, setImageToDelete] = useState(null);
  const openModal = (id) => {
      setImageToDelete(id);
      setModalOpen(true);
    };
  
    const closeModal = () => {
      setModalOpen(false);
      setImageToDelete(null);
    };
  
    const confirmDelete = () => {
      if (imageToDelete) {
        handleDeleteImage(imageToDelete);
      }
      closeModal();
    };
    
   <button
   className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
   onClick={() => openModal(image._id)}
  >
  
  
  
  
  
  
     
  
  